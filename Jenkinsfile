pipeline {
  agent any
    tools {
        // Specify the Docker and Node.js installations configured in step 3 and step 6
        dockerTool 'docker'
        nodejs 'node js'
    }
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
    // stage('Build Images') {
    //   steps {
    //     dir("backend") {
    //       sh 'docker build -t mrrfifa/backend-image .'
    //     }
    //     dir("frontend") {
    //       sh 'docker build -t mrrfifa/frontend-image .'
    //     }
    //     dir("nginx") {
    //       sh 'docker build -t mrrfifa/proxy-image .'
    //     }
    //     dir("ml") {
    //       sh 'docker build -t mrrfifa/ml-image .'
    //     }
    //   }
    // }
        stage('Backend install dependencies') {
  steps {
    dir("backend") {
          sh 'npm install'
        }
  }
}
    stage('Test Registration back') {
  steps {
    dir("backend") {
          sh 'npm test'
        }
  }
}
    stage('Frontend dep install') {
      steps {
        dir("frontend") {
          sh 'npm ci'
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
