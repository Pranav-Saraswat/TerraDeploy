variable "container_image" {
  description = "Docker image for Cloud Run"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "subnet_cidr" {
  description = "CIDR block for the subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "node_count" {
  description = "Number of nodes in GKE pool"
  type        = number
  default     = 1
}
