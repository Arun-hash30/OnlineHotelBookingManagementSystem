pipeline {
    agent any
    
    tools {
        maven 'Maven 3.9.9'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Arun-hash30/OnlineHotelBookingManagementSystem']])
            }
        }
        stage('Build') {
            steps {
                dir('OnlineHotelBookingSystem-backend') {
                    bat 'mvn clean install'
                }
            }
        }
    }
}
