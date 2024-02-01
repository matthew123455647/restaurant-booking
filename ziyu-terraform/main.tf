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
resource "azurerm_resource_group" "bookingResourceGroup" { 
 name = "bookingResourceGroup" 
 location = "East US" 
} 
resource "azurerm_kubernetes_cluster" "bookingAKSCluster" { 
 name = "bookingAKSCluster" 
 location = azurerm_resource_group.bookingResourceGroup.location 
 resource_group_name = azurerm_resource_group.bookingResourceGroup.name 
 dns_prefix = "rms-aks" 
 default_node_pool { 
 name = "default" 
 node_count = 1 
 vm_size = "Standard_DS2_v2" 
 } 
 service_principal { 
 client_id = "4c2c833b-86c7-435f-b2ab-45fb191a5ba2" 
 client_secret = "bxd8Q~dqtLonSc2nwcOQm1Deb0aUaaTJp5SW2bA~" 
 } 
}