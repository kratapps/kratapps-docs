# Component Library

[![GitHub](https://img.shields.io/badge/GitHub-Public-black?logo=github)](https://github.com/kratapps/component-library)

Custom Salesforce LWC and Apex Components.

## Installation

Use our sfdx plugin to install all components without cloning:

```text
sfdx kratapps:remote:source:deploy -s https://github.com/kratapps/component-library -p src/main/default -u myOrg
```

or only some components:

```text
sfdx kratapps:remote:source:deploy -s https://github.com/kratapps/component-library -p src/main/default/lwc/spinner -u myOrg
```

or clone the project and deploy using standard sfdx command.

## Documentation

Full documentation is available at
[docs.kratapps.com](https://docs.kratapps.com/component-library/overview/components/).
