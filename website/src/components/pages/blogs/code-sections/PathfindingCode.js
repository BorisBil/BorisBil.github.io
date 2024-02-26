const Node = 
`---------------------------------------------------------------------
// Node.cs

public class Node
{
    public Vector3 location;

    public float F;

    public bool isWalkable;
    public bool isRamp;
    public float movementCost;

    public Node previous;

    public List<Node> neighbors;

    public Node()
    {
        neighbors = new List<Node>();
    }
}
---------------------------------------------------------------------
// GrassyHills.cs

public Dictionary<Vector3, Node> GenerateMapGraph(int mapSizeX, int mapSizeY, int mapSizeZ)
{
    pathfindingGraph = new Dictionary<Vector3, Node>();

    /// Generate a node for each tile we have on the map
    foreach (KeyValuePair<Vector3, TileSets.GrassyHillTiles> tileLocation in tileTypeMap)
    {
        TileSets.GrassyHillTiles type = tileLocation.Value;
        Vector3 newNodeLocation = tileLocation.Key;
        
        pathfindingGraph[newNodeLocation] = new Node();
        pathfindingGraph[newNodeLocation].movementCost = type.movementCost;

        /// Setting unwalkable tiletypes to not be walkable on the node grid
        if (type.isWalkable == true)
        {
            pathfindingGraph[newNodeLocation].isWalkable = true;
        }
        else
        {
            pathfindingGraph[newNodeLocation].isWalkable = false;
        }

        /// Setting "underground" nodes to be unwalkable
        if (tileTypeMap.ContainsKey(new Vector3(newNodeLocation.x, newNodeLocation.y, newNodeLocation.z + 1)) 
            || tileTypeMap.ContainsKey(new Vector3(newNodeLocation.x, newNodeLocation.y, newNodeLocation.z + 0.5f)))
        {
            pathfindingGraph[newNodeLocation].isWalkable = false;
        }

        foreach (Prop prop in propList)
        {
            if (prop.blocksTile)
            {
                pathfindingGraph[new Vector3(prop.location.x, prop.location.y, prop.location.z)].isWalkable = false;
            }
        }

        pathfindingGraph[newNodeLocation].location = new Vector3(newNodeLocation.x, newNodeLocation.y, newNodeLocation.z);
    }
`

const GenerateGraphPart2 = 
`// GrassyTiles.cs

    foreach (KeyValuePair<Vector3, Node> node in pathfindingGraph)
        {
            Vector3 nodeLocation = node.Key;

            /// Adding all the neighbors that are on the same plane
            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z)))
            {
                pathfindingGraph[nodeLocation].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z)]);
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z)))
            {
                pathfindingGraph[nodeLocation].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z)]);
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z)))
            {
                pathfindingGraph[nodeLocation].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z)]);
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z)))
            {
                pathfindingGraph[nodeLocation].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z)]);
            }

            /// Adding "steps" between higher ground and the half tiles to the neighbors
            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            /// Adding "steps" between the half tiles to lower ground
            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x - 1, nodeLocation.y, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x + 1, nodeLocation.y, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y - 1, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }

            if (tileTypeMap.ContainsKey(new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)))
            {
                if (pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)].isWalkable)
                {
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)]);
                    pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y + 1, nodeLocation.z - 0.5f)].neighbors.Add(pathfindingGraph[new Vector3(nodeLocation.x, nodeLocation.y, nodeLocation.z)]);
                }
            }
        }

    GetWalkableNodes();

    return pathfindingGraph;
}

public void GetWalkableNodes()
{
    walkableNodes = new List<Node>();

    foreach (KeyValuePair<Vector3, Node> tileLocation in pathfindingGraph)
    {
        if (pathfindingGraph[tileLocation.Key].isWalkable)
        {
            walkableNodes.Add(pathfindingGraph[tileLocation.Key]);
        }
    }
}
---------------------------------------------------------------------
`

const GetDistance = 
`// TileMap.cs
public float GetDistance(Node start, Node end)
{
    return  Mathf.Abs(start.location.x - end.location.x) + 
            Mathf.Abs(start.location.y - end.location.y) + 
            Mathf.Abs(start.location.z - end.location.z);
}
`

const Pathfinding = 
`// TileMap.cs
public List<Node> GeneratePathTo(Vector3 targetLocation, Vector3 unitLocation)
{
    Node startNode = graph[new Vector3(unitLocation.x, unitLocation.y, unitLocation.z)];
    Node endNode = graph[new Vector3(targetLocation.x, targetLocation.y, targetLocation.z)];

    List<Node> openList = new List<Node>();
    Dictionary<Node, float> cost_so_far = new Dictionary<Node, float>();
        
    openList.Add(startNode);
    cost_so_far[startNode] = 0;

    while (openList.Count > 0) 
    {
        Node currentNode = openList.OrderBy(node => node.F).First();

        openList.Remove(currentNode);

        if (currentNode == endNode)
        {
            return GetFinishedList(startNode, endNode);
        }

        foreach (Node neighbor in currentNode.neighbors)
        {
            float new_cost = cost_so_far[currentNode] + neighbor.movementCost;
                
            if ((neighbor.isWalkable) && (!cost_so_far.ContainsKey(neighbor) || new_cost < cost_so_far[neighbor]))
            {
                cost_so_far[neighbor] = new_cost;
                neighbor.F = new_cost + GetDistance(endNode, neighbor);
                neighbor.previous = currentNode;
                    
                if (!openList.Contains(neighbor))
                {
                    openList.Add(neighbor);
                }
            }
        }
    }

    return new List<Node>();
}
`

const ReverseList = 
`// TileMap.cs
private List<Node> GetFinishedList(Node startNode, Node endNode)
{
    List<Node> path = new List<Node>();
    Node currentNode = endNode;

    while (currentNode != startNode)
    {
        path.Add(currentNode);
        currentNode = currentNode.previous;
    }
    path.Reverse();

    return path;
}
`

export {    Node, GenerateGraphPart2,
            GetDistance, Pathfinding, ReverseList   }
