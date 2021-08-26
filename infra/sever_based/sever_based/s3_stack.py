from aws_cdk import core
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_ssm as ssm



class S3Stack(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)

        account_id = core.Aws.ACCOUNT_ID
        prj_name = self.node.try_get_context("project_name")
        env_name = self.node.try_get_context("env")

        # frontend bucket
        artifacts_bucket = s3.Bucket(self, 'frontend',
                                     public_read_access=True,
                                     website_index_document='index.html',
                                     removal_policy=core.RemovalPolicy.DESTROY
                                     )
        core.CfnOutput(self, 'frontend-bucket-export',
                       value=artifacts_bucket.bucket_name,
                       export_name='ecommerce-bucket')