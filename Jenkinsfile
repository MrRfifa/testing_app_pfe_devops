pipeline {
  agent any
    tools {
        // Specify the Docker and Node.js installations configured in step 3 and step 6
        dockerTool 'docker'
        nodejs 'node js'
    }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Backend tests') {
      steps {
        dir('backend') {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Build backend image') {
      steps {
        dir('backend') {
          sh 'docker build -t mrrfifa/backend-image .'
        }
      }
    }
    stage('Build frontend image') {
      steps {
            dir('frontend') {
          sh 'docker build -t mrrfifa/frontend-image .'
            }
      }
    }
    stage('Build ml image') {
      steps {
        dir('ml') {
          sh 'docker build -t mrrfifa/ml-image .'
        }
      }
    }
    stage('build proxy image') {
      steps {
        dir('nginx') {
          sh 'docker build -t mrrfifa/proxy-image .'
        }
      }
    }
  }
}
