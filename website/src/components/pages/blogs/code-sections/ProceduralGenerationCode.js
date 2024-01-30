const Tile = `
public class Tile : MonoBehaviour
{
    public Vector3 tileLocation;
    public bool isClickable = false;

    public bool isRamp;
    public bool hasProp;

    public Dictionary<string, string> coverOnTile;
    
    public TileMap map;
}
`

const TileSets = `
public class TileSets
{
    [System.Serializable]
    public class GrassyHillTiles : TileType
    {

    }

    [System.Serializable]
    public class DesertHillTiles : TileType
    {

    }
}
`

const TileTypes = `
public class TileType
{
    public string name;
    public GameObject tileVisualPrefab;

    public bool isWalkable = true;
    public bool isRamp;

    public float movementCost = 1;
}
`

const TileMap = `
  public void GenerateGrassyHills(int mapSizeX, int mapSizeY, int mapSizeZ)
  {
    grassyHills.GenerateMapData(mapSizeX, mapSizeY, mapSizeZ);
    grassyHills.GeneratePropData(mapSizeX, mapSizeX, mapSizeZ);
    grassyHills.GenerateMapVisual();
    
    graph = grassyHills.GenerateMapGraph(mapSizeX, mapSizeY, mapSizeZ);
    lights = grassyHills.GenerateMapLighting(mapSizeX, mapSizeY, mapSizeZ);
    grassyHills.GenerateMapCover();


    walkableNodes = grassyHills.ReturnWalkableNodeList();
    lightsGraph = grassyHills.ReturnLightGraph();
  }
`

const GenerateGrassyHillsPart1 = `
public void GenerateMapData(int mapSizeX, int mapSizeY, int mapSizeZ)
{
    tileTypeMap = new Dictionary<Vector3, TileSets.GrassyHillTiles>();

    for (int x = 0; x < mapSizeX; x++)
    {
        for (int y = 0; y < mapSizeY; y++)
        {
            if (tileTypeMap.ContainsKey(new Vector3(x, y, 0)))
            {
                continue;
            }

            float rollTerrainChance = Random.Range(0.0f, 1.0f);
            float rollElevationChance = Random.Range(0.0f, 1.0f);
`

const GenerateGrassyHillsPart2 = `
            if (rollTerrainChance <= 0.9f && x < mapSizeX - 2 && y < mapSizeY - 2)
                {
                    tileTypeMap[new Vector3(x, y, 0)] = grassyHills[0];

                    if (rollElevationChance > 0.90f && x < mapSizeX - 2 && y < mapSizeY - 2)
                    {
                        tileTypeMap[new Vector3(x, y + 1, 1)] = grassyHills[0];
                        tileTypeMap[new Vector3(x, y + 2, 1)] = grassyHills[0];
                        tileTypeMap[new Vector3(x + 1, y + 1, 1)] = grassyHills[0];
                        tileTypeMap[new Vector3(x + 1, y + 2, 1)] = grassyHills[0];

                        if (!tileTypeMap.ContainsKey(new Vector3(x, y, 1)))
                        {
                            tileTypeMap[new Vector3(x, y, 0.5f)] = grassyHills[3];
                        }
                        if (!tileTypeMap.ContainsKey(new Vector3(x + 1, y, 1)))
                        {
                            tileTypeMap[new Vector3(x + 1, y, 0.5f)] = grassyHills[3];
                        }

                        float rollMountainChance = Random.Range(0.0f, 1.0f);
                        if (rollMountainChance > 0.9f)
                        {
                            tileTypeMap[new Vector3(x, y + 2, 2)] = grassyHills[2];
                            tileTypeMap[new Vector3(x + 1, y + 2, 2)] = grassyHills[2];
                        }
                    }
                }
                else
                {
                    tileTypeMap[new Vector3(x, y, 0)] = grassyHills[0];
                }
`

const GenerateGrassyHillsPart3 = `
                if (x < mapSizeX - 2 && y < mapSizeY - 2)
                {
                    if (rollTerrainChance > 0.9f && rollTerrainChance < 1.0f)
                    {
                        tileTypeMap[new Vector3(x, y, 0)] = grassyHills[1];
                        tileTypeMap[new Vector3(x + 1, y, 0)] = grassyHills[1];
                        tileTypeMap[new Vector3(x, y + 1, 0)] = grassyHills[1];
                        tileTypeMap[new Vector3(x + 1, y + 1, 0)] = grassyHills[1];
                    }
                }
            }
        }
    }
`

const PropType = `
public class PropType
{
    public string name;
    public GameObject propVisualPrefab;

    public bool isStructure;
    public bool blocksTile;

    public float coverType;
}
`

const PropSets = `
public class PropSets
{
    [System.Serializable]
    public class GrassyHillProps : PropType
    {

    }

    [System.Serializable]
    public class DesertHillProps : PropType
    {

    }
}
`

const Prop = `
public class Prop : MonoBehaviour
{
    public Vector3 location;

    public bool isStructure;
    public bool blocksTile;

    public float coverType;

    public TileMap map;
}
`

const GeneratePropData = `
public void GeneratePropData(int mapSizeX, int mapSizeY, int mapSizeZ)
{
    propTypeMap = new Dictionary<Vector3, GrassyHillProps>();

    foreach (KeyValuePair<Vector3, TileSets.GrassyHillTiles> tile in tileTypeMap)
    {
        Vector3 tileLocation = tile.Key;

        if (!tileTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y, tileLocation.z + 1))
            && !tileTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y, tileLocation.z + 0.5f)))
        {
            float propChance = Random.Range(0.0f, 1.0f);

            if (propChance > 0.95f)
            {
                float propTypeChance = Random.Range(0.0f, 1.0f);
                
                if (propTypeChance < 0.3)
                {
                    propTypeMap[tileLocation] = grassyHillsProps[0];
                }

                if (propTypeChance > 0.3 && propTypeChance < 0.8)
                {
                    propTypeMap[tileLocation] = grassyHillsProps[1];
                }

                if (propTypeChance > 0.8)
                {
                    if (tileLocation.x < mapSizeX - 2
                        && propTypeMap.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z))
                        && propTypeMap.ContainsKey(new Vector3(tileLocation.x + 2, tileLocation.y, tileLocation.z))
                        && !propTypeMap.ContainsKey(new Vector3(tileLocation.x + 2, tileLocation.y, tileLocation.z + 1))
                        && !propTypeMap.ContainsKey(new Vector3(tileLocation.x + 2, tileLocation.y, tileLocation.z + 1)))
                    {
                        propTypeMap[new Vector3(tileLocation.x, tileLocation.y, tileLocation.z)] = grassyHillsProps[2];
                        propTypeMap[new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z)] = grassyHillsProps[3];
                        propTypeMap[new Vector3(tileLocation.x + 2, tileLocation.y, tileLocation.z)] = grassyHillsProps[4];
                    }
                }
            }
        }
    }
}
`

const GenerateMapVisual = `
public void GenerateMapVisual()
{
      tileMapDict = new Dictionary<Vector3, Tile>();

      propList = new List<Prop>();

      foreach (KeyValuePair<Vector3, TileSets.GrassyHillTiles> tileLocation in tileTypeMap)
      {
          /// Instantiating the tiles after setting their type based on the map graph
          TileSets.GrassyHillTiles type = tileLocation.Value;
          GameObject tile = Instantiate(type.tileVisualPrefab, new Vector3( tileLocation.Key.x, 
                                                                            tileLocation.Key.y, 
                                                                            tileLocation.Key.z), Quaternion.identity);
          tile.transform.parent = tiles.transform;

          /// Setting clickable tiles based on type
          Tile clickableTile = tile.GetComponent<Tile>();
          clickableTile.tileLocation = tileLocation.Key;

          tileMapDict[tileLocation.Key] = clickableTile;

          if (propTypeMap.ContainsKey(new Vector3(tileLocation.Key.x, tileLocation.Key.y, tileLocation.Key.z)))
          {
              clickableTile.hasProp = true;
          }
      }

      foreach (KeyValuePair<Vector3, GrassyHillProps> tileProp in propTypeMap)
      {
          /// Instantiating the props after setting their type based on the prop graph
          PropSets.GrassyHillProps type = tileProp.Value;
          GameObject prop = Instantiate(type.propVisualPrefab, new Vector3( tileProp.Key.x, 
                                                                            tileProp.Key.y, 
                                                                            tileProp.Key.z), Quaternion.identity);
          prop.transform.parent = props.transform;

          /// Setting props based on type
          Prop propInfo = prop.GetComponent<Prop>();
            
          propInfo.location = tileProp.Key;
          propInfo.isStructure = type.isStructure;
          propInfo.blocksTile = type.blocksTile;
          propInfo.coverType = type.coverType;

          propList.Add(propInfo);
      }
}
`

export {    Tile, TileMap, TileSets, TileTypes,
            GenerateGrassyHillsPart1, GenerateGrassyHillsPart2, GenerateGrassyHillsPart3,
            Prop, PropSets, PropType, 
            GeneratePropData, GenerateMapVisual
        } 