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

resource "google_artifact_registry_repository" "web" {
  location      = "asia-northeast1"
  repository_id = "web"
  format        = "DOCKER"
}

resource "google_cloud_run_service" "default1" {
  name     = "frontend"
  location = "asia-northeast1"

  template {
    spec {
      containers {
        image = "asia-northeast1-docker.pkg.dev/study-hack/web/frontend"
        ports {
          container_port = 3001
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}