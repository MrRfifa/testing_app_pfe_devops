pipeline {
  agent any
  tools {
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
    stage('Build frontend image') {
      steps {
        dir('frontend') {
          sh 'docker build -t mrrfifa/frontend-image .'
        }
      }
    }
    stage('Push images to Docker Hub') {
      steps {
        sh 'docker login -u your_dockerhub_username -p your_dockerhub_password'
        sh 'docker push mrrfifa/backend-image'
        sh 'docker push mrrfifa/ml-image'
        sh 'docker push mrrfifa/proxy-image'
        sh 'docker push mrrfifa/frontend-image'
      }
    }
  }
}