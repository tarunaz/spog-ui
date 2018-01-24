@Library('pengg-openshift-pipelines') _

node('nodejs') {
	
	stage('Checkout OCP templates') {
	   echo 'Checkout OpenShift templates'
	   checkoutOcpTemplates 'git@github.com:tarunaz/pengg-openshift.git'

	}

	stage('Process OCP Build templates') {
	   echo 'Process OpenShift Build templates'
           processOcpBuildTemplates {
	       gitRepoUrl = "git@github.com:tarunaz/spog-ui.git"
	       microservice = "tarun-spog"
	       sourceRepositoryRef = "master"
	       gitPullSecret = "tarun-spog-master"
	       buildNamespace = "nss"
	       deployNamespace ="tarun-spog1"
	       emailAddress="test@example.com"
	   }
	   
	}


	stage('Start OpenShift build') {
	   echo 'Start OpenShift build'
           startOcpBuild {
	      namespace = "nss"
	      buildConfigName = "tarun-spog-master"
	   }
	   
	}

	stage('Process OCP Deployment templates') {
	   echo 'Process OpenShift Deployment templates'
           processOcpDeploymentTemplates {
               ocpUrl = "https://tpaas-console.netapp.com:8443"
               namespace = "tarun-spog1"
	       microservice = "tarun-spog"
	       sourceRepositoryRef = "master"
	   }
	}

	stage('Tag OpenShift Image') {
	   echo 'Tag OpenShift Image'
           tagOcpImage   
	}

	
	stage('Import OpenShift Image to TPAAS') {
	   echo 'Import OpenShift Image to TPAAS'
           importImageToTpaas {
 		namespace = "tarun-spog1"
	        version = '1.7'
	   }
	}

	stage('Deploy to TPAAS') {
	   echo 'Deploy to TPAAS'
           deployToTpaas {
               ocpUrl = "https://tpaas-console.netapp.com:8443"
               namespace = "tarun-spog1"
	       microservice = "tarun-spog"
	   }
	}

}



