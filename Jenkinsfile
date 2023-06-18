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

    // stage('Backend tests') {
    //   steps {
    //     dir('backend') {
    //       sh 'npm install'
    //       sh 'npm test'
    //     }
    //   }
    // }

    // stage('Build backend image') {
    //   steps {
    //     dir('backend') {
    //       sh 'docker build -t mrrfifa/backend-image .'
    //     }
    //   }
    // }

    // stage('build proxy image') {
    //   steps {
    //     dir('nginx') {
    //       sh 'docker build -t mrrfifa/proxy-image .'
    //     }
    //   }
    // }

    // stage('Build ml image') {
    //   steps {
    //     dir('ml') {
    //       sh 'docker build -t mrrfifa/ml-image .'
    //     }
    //   }
    // }

    // stage('Build frontend image') {
    //   steps {
    //     dir('frontend') {
    //       sh 'docker build -t mrrfifa/frontend-image .'
    //     }
    //   }
    // }

    stage('SonarQube analysis - Backend') {
      steps {
        dir('backend') {
          script {
            def scannerHome = tool 'sonar'
            withSonarQubeEnv('sonar') {
              sh """${scannerHome}/bin/sonar-scanner \
                  -Dsonar.projectKey=PFE-BACKEND-NODE \
                  -Dsonar.sources=. \
                  -Dsonar.exclusions=**/node_modules/**,**/clones/**,**/test/**,**/uploads/**,*.json,*.log,.*,Dockerfile \
                  -Dsonar.host.url=http://20.39.234.86:9000 \
                  -Dsonar.login=${SONAR_TOKEN_BACK}"""
            }
          }
        }
      }
    }

    stage('SonarQube analysis - ML') {
      steps {
        dir('ml') {
          script {
            def scannerHome = tool 'sonar'
            withSonarQubeEnv('sonar') {
              sh """${scannerHome}/bin/sonar-scanner \
                  -Dsonar.projectKey=PFE-ML-PYTHON \
                  -Dsonar.sources=app.py,functions.py \
                  -Dsonar.host.url=http://20.39.234.86:9000 \
                  -Dsonar.login=${SONAR_TOKEN_ML}"""
            }
          }
        }
      }
    }

    stage('SonarQube analysis - Frontend') {
      steps {
        dir('frontend') {
          script {
            def scannerHome = tool 'sonar'
            withSonarQubeEnv('sonar') {
              sh "${scannerHome}/bin/sonar-scanner \
                  -Dsonar.projectKey=PFE-FRONTEND-REACT \
                  -Dsonar.sources=./src \
                  -Dsonar.exclusions=**/node_modules/**,**/assets/**,*.json,*.md,.*,Dockerfile,*.css,*.conf \
                  -Dsonar.host.url=http://20.39.234.86:9000 \
                  -Dsonar.login=${SONAR_TOKEN_FRONT}"
            }
          }
        }
      }
    }
    //SONAR_TOKEN_FRONT
    //SONAR_TOKEN_BACK



    // stage('Push images to Docker Hub') {
    //   steps {
    //     sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
    //     sh 'docker push mrrfifa/backend-image'
    //     sh 'docker push mrrfifa/ml-image'
    //     sh 'docker push mrrfifa/proxy-image'
    //     sh 'docker push mrrfifa/frontend-image'
    //   }
    // }
  }
}