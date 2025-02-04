node{
    def mavenPath = 'C:\\Users\\Arun Ravikanth\\Downloads\\apache-maven-3.9.9\\bin\\mvn'
    stage('Checkout'){
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Arun-hash30/OnlineHotelBookingManagementSystem.git']])
    }
    stage('Build'){
        dir('OnlineHotelBookingSystem-backend'){
            bat """
            "${mavenPath}" clean install
            """
        }
    }
}
