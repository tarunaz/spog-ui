@Library('pengg-openshift-pipelines') _

node('nodejs') {

	def config = [
	       microservice: "${BASE}",
	       version: "1.7",
	       gitRepoUrl: "${SOURCE_REPOSITORY_URL}",
	       sourceRepositoryRef: "master",
	       gitPullSecret: "tarun-spog-master",
	       buildNamespace: "nss",
	       deployNamespace: "tarun-spog1",
	       emailAddress: "test@example.com",
               ocpUrl: "https://tpaas-console.netapp.com:8443"
	]
	
	stage('Checkout OCP templates') {
	   echo 'Checkout OpenShift templates'
	   checkoutOcpTemplates 'git@github.com:tarunaz/pengg-openshift.git'

	}

	stage('Process OCP Build templates') {
	   echo 'Process OpenShift Build templates'
           processOcpBuildTemplates ( config )
	   
	}

	stage('Start OpenShift build') {
	   echo 'Start OpenShift build'
           startOcpBuild ( config )
	}

	stage('Process OCP Deployment templates') {
	   echo 'Process OpenShift Deployment templates'
           processOcpDeploymentTemplates ( config )
	}

	stage('Tag OpenShift Image') {
	   echo 'Tag OpenShift Image'
           tagOcpImage ( config )
	}

	
	stage('Import OpenShift Image to TPAAS') {
	   echo 'Import OpenShift Image to TPAAS'
           importImageToTpaas ( config )
	}

	stage('Deploy to TPAAS') {
	   echo 'Deploy to TPAAS'
           deployToTpaas ( config )
	}
}



