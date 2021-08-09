import cdk = require("@aws-cdk/core");
import {StaticSiteStack} from "../lib/ts-stack";

const app = new cdk.App();
const staticSite = new StaticSiteStack(app, "NextJS10StaticSite", {
  env: {
    account: app.node.tryGetContext("account"),
    region: app.node.tryGetContext("region"),
  },
  domainName: "manrodri.com",
  siteSubDomain: "app",
});

// example of adding a tag - please refer to AWS best practices for ideal usage
cdk.Tags.of(staticSite).add("Project", "NextJS 10 Example Deployment");

app.synth();