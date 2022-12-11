provider "google" {
  project = "study-hack"
}

resource "google_project_service" "activate_gcp_services" {
  project = "study-hack"
  disable_dependent_services = true
  for_each = toset([
    "cloudbuild.googleapis.com",
    "containerregistry.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "cloudresourcemanager.googleapis.com"
  ])
  service  = each.key
}

resource "google_cloudbuild_trigger" "cloudbuild" {
  filename = "cloudbuild.yml"

  github {
    owner = "lsptt5271"
    name  = "study-hack"
    push {
      branch = "^main$"
    }
  }
}