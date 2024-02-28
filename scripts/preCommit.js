#!/usr/bin/node
const path = require('path');
const fs = require('fs-extra');

const referenceDir = path.join(__dirname, '../docs/setup-audit-trail');
const actionsJsonFile = path.join(referenceDir, 'reference.json');
const referenceFile = path.join(referenceDir, 'reference.md');
const referenceTemplateFile = path.join(referenceDir, 'reference-template.md');

async function main() {
    let actions = fs.readJsonSync(actionsJsonFile);
    // Sort actions
    actions.sort((a, b) => a.action.localeCompare(b.action) || a.title.localeCompare(b.title));
    checkDuplicates(actions);
    fs.writeJsonSync(actionsJsonFile, actions, {spaces: 2});
    // Create README.md
    await createDocs(actions);
}

function checkDuplicates(actions) {
    const names = [];
    for (let action of actions) {
        const name = action.action;
        if (names.includes(name)) {
            throw new Error(`Duplicate action: ${name}`);
        }
        names.push(name);
    }
}

const buildQuery = (actions) => `\`\`\`
SELECT CreatedDate, CreatedById, CreatedBy.Username, Action, Display, Section, DelegateUser 
FROM SetupAuditTrail 
WHERE Action IN (${actions.map(it => `'${it}'`).join(',')}) 
ORDER BY CreatedDate DESC LIMIT 1000
\`\`\``;

async function createDocs(actions) {
    const categories = [
        "User Management",
        "Permission Management",
        "Automation",
        "Organization Management",
        "Schema",
        "Data Management",
        "UI"
    ];
    let readme = fs.readFileSync(referenceTemplateFile, 'utf8');
    const items = [...actions];
    items.sort((a, b) => {
        let catA = categories.indexOf(a.category);
        let catB = categories.indexOf(b.category);
        if (catA === -1) {
            catA = categories.length;
        }
        if (catB === -1) {
            catB = categories.length;
        }

        if (catA === catB) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }

        // Sort by category first, and by title if categories are different
        return catA - catB;
    });
    let currentCategory = null;
    let currentTitle = null;
    let currentActions = [];
    let reference = '';
    items.forEach((item, idx) => {
        if (currentCategory !== item.category) {
            currentCategory = item.category;
            reference += `\n## ${currentCategory}\n`;
        }
        if (currentTitle !== item.title) {
            currentTitle = item.title;
            currentActions = [];
            reference += `\n### ${currentTitle}\n`;
        }
        const section = item.section ? ` (${item.section})` : '';
        const display = item.display ? ` - ${item.display}` : '';
        currentActions.push(item.action);
        reference += `- ${item.action}${section}${display}\n`;

        let next = idx < items.length ? items[idx + 1] : null;
        if (!next || currentTitle !== next.title) {
            reference += `\n\n${buildQuery(currentActions)}\n`;
        }
    });
    await fs.writeFile(referenceFile, readme.replace('{reference}', reference));
}

main();


