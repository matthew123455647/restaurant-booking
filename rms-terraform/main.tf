# Define required providers, in this case, AzureRM by HashiCorp
terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
        }
    }
}

# Configure AzureRM provider
provider "azurerm" {
    features {}
}

# Define Azure Resource Group
resource "azurerm_resource_group" "dvopsResourceGroup" {
    name     = "dvopsResourceGroup"        # Specify a unique name for the resource group
    location = "East US"                    # Choose the Azure region for the resource group
}

# Define Azure Kubernetes Service (AKS) cluster
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
    name                = "dvopsAKSCluster"             # Specify a unique name for the AKS cluster
    location            = azurerm_resource_group.dvopsResourceGroup.location  # Use the location of the resource group
    resource_group_name = azurerm_resource_group.dvopsResourceGroup.name      # Reference the created resource group

    dns_prefix = "rms-aks"               # Specify the DNS prefix for AKS

    default_node_pool {
        name       = "default"           # Specify the name for the default node pool
        node_count = 1                   # Set the initial number of nodes
        vm_size    = "Standard_DS2_v2"   # Choose the virtual machine size
    }

    # Service Principal Configuration for AKS
    service_principal {
        client_id     = "91c5e26b-978e-48ef-a889-9e31b4ab38db"       # Specify the client ID of the service principal
        client_secret = "M7P8Q~3hDW~lcgRCOMnCVx.JReR43tAMxiefQbbd"   # Specify the client secret of the service principal
    }
}
