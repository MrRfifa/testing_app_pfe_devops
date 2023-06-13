pipeline {
  agent any

  stages {
    stage('Example') {
      steps {
        echo 'Hello World'
      }
    }
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Images') {
      steps {
        dir("backend") {
          sh 'docker build -t mrrfifa/backend-image .'
        }
        dir("frontend") {
          sh 'docker build -t mrrfifa/frontend-image .'
        }
        dir("nginx") {
          sh 'docker build -t mrrfifa/proxy-image .'
        }
        dir("ml") {
          sh 'docker build -t mrrfifa/ml-image .'
        }
      }
    }
    stage('Build frontend') {
      steps {
        dir("frontend") {
          sh 'npm run build'
        }
      }
    }
  }
}
