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
    //         stage('Build Images') {
    // 	steps {
    // 		sh 'docker build -t mrrfifa/backend-image ./backend'
    // 		sh 'docker build -t mrrfifa/frontend-image ./frontend'
    //         sh 'docker build -t mrrfifa/proxy-image ./nginx'
    //         sh 'docker build -t mrrfifa/ml-image ./ml'
    // 	}
    // }
    stage('Build frontend') {
      steps {
        dir("frontend")
        sh 'nom run build'
      }
    }
  }
}