package terraform.analysis

import input as tfplan

# Deny EC2 instances with public IP access (simulated check)
deny[msg] {
    some resource
    resource := tfplan.resource_changes[_]
    resource.type == "aws_instance"
    # Simplified check for demonstration
    resource.change.after.associate_public_ip_address == true
    msg := sprintf("Security Violation: EC2 instance %v has public IP address enabled.", [resource.name])
}

# Deny Cloud Run services without authentication (simulated check)
deny[msg] {
    some resource
    resource := tfplan.resource_changes[_]
    resource.type == "google_cloud_run_service_iam_member"
    resource.change.after.member == "allUsers"
    msg := sprintf("Security Violation: Cloud Run service %v is exposed to allUsers.", [resource.name])
}
