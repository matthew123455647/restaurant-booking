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
 client_id = "8b1cc104-d3d5-41b9-9d5d-bac0e4f9594e" 
 client_secret = "Dho8Q~i6ADIm9TSEOvwkJ6mW8kj1R0cN4tcnqaNC" 
 } 
}