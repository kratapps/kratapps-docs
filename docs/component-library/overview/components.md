# Component Library

[![GitHub](https://img.shields.io/badge/GitHub-Public-black?logo=github)](https://github.com/kratapps/component-library)

Custom Salesforce LWC and Apex Components.

## Installation

Use our sfdx plugin to install all components without cloning:

```shell
sf kratapps remote deploy start \
    --repo-owner kratapps \
    --repo-name component-library \
    --source-dir src/ \
    -o my-org
```

or only some components:

```shell
sf kratapps remote deploy start \
    --repo-owner kratapps \
    --repo-name component-library \
    --source-dir src/library/lwc/spinner/ \
    -o my-org
```

or clone the project and deploy using standard sf command

or copy and paste the code from
[github.com/kratapps/component-library](https://docs.kratapps.com/component-library/overview/components/).

## Documentation

Full documentation is available at
[docs.kratapps.com](https://docs.kratapps.com/component-library/overview/components/).
