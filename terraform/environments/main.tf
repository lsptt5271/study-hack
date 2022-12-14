provider "google" {
  project = var.project
}

resource "google_project_service" "activate_gcp_services" {
  disable_dependent_services = true
  for_each = toset([
    "cloudbuild.googleapis.com",
    "containerregistry.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "cloudresourcemanager.googleapis.com"
  ])
  service = each.key
}

resource "google_artifact_registry_repository" "web" {
  location      = var.region
  repository_id = "web"
  format        = "DOCKER"
  depends_on    = [google_project_service.activate_gcp_services["artifactregistry.googleapis.com"]]
}

resource "google_cloudbuild_trigger" "trigger" {
  filename = "cloudbuild.yml"
  name     = "trigger"

  github {
    owner = var.github_owner
    name  = var.github_repository
    push {
      branch = var.github_branch
    }
  }

  substitutions = {
    _REGISTRY       = google_artifact_registry_repository.web.repository_id
    _REGISTRY_URL   = "${var.region}-docker.pkg.dev"
    _CONTAINER_NAME = var.container_api
  }
}

resource "google_cloud_run_service" "api" {
  name     = var.container_api
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project}/${google_artifact_registry_repository.web.repository_id}/${var.container_api}"
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

resource "google_cloud_run_service_iam_member" "cloud_run_member" {
  location = var.region
  service  = var.container_api
  role     = "roles/run.invoker"
  member   = "allUsers"
}

module "cloud_sql" {
  source = "../modules/cloud-sql"

  region = var.region
}
