node {
    // Use Maven directly by specifying the path
    def mavenPath = 'C:\\Users\\Arun Ravikanth\\Downloads\\apache-maven-3.9.9\\bin\\mvn'

    stage('Checkout') {
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Arun-hash30/OnlineHotelBookingManagementSystem.git']])
    }

    stage('Test') {
        dir('OnlineHotelBookingSystem-backend') {
            bat """ 
                "${mavenPath}" clean install
            """
        }
    }
}
