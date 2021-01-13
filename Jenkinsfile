properties([pipelineTriggers([githubPush()])])
pipeline {
    environment {
        PATH = "$PATH:/usr/local/bin"
    }
    agent any
    stages {
        stage('Build') { 
            steps {
            //   when { tag "release-*" }
              withEnv(["PATH=$PATH:~/.local/bin"]){
                sh "chmod +x ./build.sh"
                sh "./build.sh"
              }
            }
        }
        
    }
    post {
       always {
           deleteDir()
       }
    }
}

