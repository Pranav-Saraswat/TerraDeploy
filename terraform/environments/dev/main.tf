module "aws_infra" {
  source      = "../../modules/aws"
  environment = "dev"
  ami_id      = "ami-0c55b159cbfafe1f0"
  vpc_cidr    = "10.0.0.0/16"
}

module "gcp_infra" {
  source      = "../../modules/gcp"
  environment = "dev"
  container_image = "gcr.io/cloudrun/hello"
  subnet_cidr = "10.0.1.0/24"
  node_count  = 1
}

module "azure_infra" {
  source      = "../../modules/azure"
  environment = "dev"
  location    = "East US"
}

output "aws_instance_public_ip" {
  value = module.aws_infra.instance_public_ip
}

output "gcp_service_url" {
  value = module.gcp_infra.service_url
}

output "gke_cluster_endpoint" {
  value = module.gcp_infra.cluster_endpoint
}
