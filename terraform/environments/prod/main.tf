# Production Infrastructure Configuration

module "aws_infra" {
  source      = "../../modules/aws"
  environment = "prod"
  ami_id      = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium" # Beefier instance for prod
}

module "gcp_infra" {
  source      = "../../modules/gcp"
  environment = "prod"
  container_image = "gcr.io/cloudrun/hello"
}

output "aws_instance_public_ip" {
  value = module.aws_infra.instance_public_ip
}

output "gcp_service_url" {
  value = module.gcp_infra.service_url
}
