@Library('pengg-openshift-pipelines') _

node('nodejs') {
	
	stage('Checkout OCP templates') {

	   checkoutOcpTemplates()

	}

	stage('Process OCP Build templates') {
	   
           processOcpBuildTemplates()
	   
	}

	stage('Start OpenShift build') {
	   
           startOcpBuild()
	}

	stage('Process OCP Deployment templates') {
	   
           processOcpDeploymentTemplates()
	}

	stage('Tag OpenShift Image') {
	   
           tagOcpImage()
	}

	
	stage('Import OpenShift Image to TPAAS') {
	   
           importImageToTpaas()
	}

	stage('Deploy to TPAAS') {
	   
           deployToTpaas()
	}
}



