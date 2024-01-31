terraform { 
 required_providers { 
 azurerm = { 
 source = "hashicorp/azurerm" 
 } 
 } 
} 
provider "azurerm" { 
 features {} 
} 
resource "azurerm_resource_group" "dvopsResourceGroup" { 
 name = "dvopsResourceGroup" 
 location = "East US" 
} 
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" { 
 name = "dvopsAKSCluster" 
 location = azurerm_resource_group.dvopsResourceGroup.location 
 resource_group_name = azurerm_resource_group.dvopsResourceGroup.name 
 dns_prefix = "rms-aks" 
 default_node_pool { 
 name = "default" 
 node_count = 1 
 vm_size = "Standard_DS2_v2" 
 } 
 service_principal { 
 client_id = "fa3d182d-1a2b-49a8-a9ea-fb002954693b" 
 client_secret = "CRQ8Q~W5sTUoyRBqgkLQkfwfUa4vhhMPJ3wqeawC" 
 } 
}