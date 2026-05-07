terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

variable "gcp_project_id" {
  description = "GCP Project ID"
  type        = string
}
