resource "google_sql_database_instance" "instance" {
  name                = "instance"
  database_version    = "POSTGRES_13"
  region              = var.region
  deletion_protection = false

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "database" {
  name     = "study-hack"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = "me"
  instance = google_sql_database_instance.instance.name
  host     = "%"
  password = "uniformnexttest"
}
