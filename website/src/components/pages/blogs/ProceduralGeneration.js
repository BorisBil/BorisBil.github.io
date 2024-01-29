import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

import '../../css/BlogPost.css'

import Layout from '../../layouts/Layout'

hljs.registerLanguage("javascript", javascript);

function ProceduralGeneration() {
  return (
    <Layout>
    <div className = "blog-post-wrapper">
      <h1 className = "blog-post-title">Procedural Map Generation</h1>
      <div className = "intro-image">
        <img src = {require('../../images/blog-images/procedural-generation/intro-image.png')} alt = 'intro-pic'></img>
      </div>
      <div className = "big-text-box">
        <p>
          The single, most important element in any video game out there is what is termed
          as the "core gameplay loop." Gameplay is what people consume games for after all, since
          at the end of the day, they are looking for fun and satisfying mechanics to have fun with, whether
          it is city management, a 4x space game, or just running around shooting things like in an FPS.
          A good core gameloop provides a strong foundation for a fantastic game, and maps (or levels) are essentially
          used to showcase the gameloop. Well designed maps are important for every stage of the game, whether the level serves
          as an introductory course to certain mechanics, or as a challenge for the player to complete using their full knowledge of
          the game.
        </p>
      </div>
      <div className = "big-text-box">
        <p>
          In my current in-progress game, the plan is to have procedurally generated levels as the player party goes deeper into a 
          "dungeon." I have a basic template system in place that serves as a foundation for any necessary future expansions, including
          improvements to generation algorithms and the introduction of actual assets. Preset asset classes are used to generate the map,
          on top of which a pathfinding map is laid, in order to facilitate movement around the map.
        </p>
      </div>
      
      <div className = "big-box">
        <div className = "image-box">
          <img src = {require('../../images/blog-images/procedural-generation/overall-set.png')} alt = 'intro-pic'></img>
        </div>
        <div className = "small-text-box">
          <p>
            Before we generate any maps, we have to define the actual objects that we are going to be using in our map. Since I wanted to 
            be able to add, delete, and otherwise edit values of tiles inside tilesets in the editor, I have a TileSets class that inherits
            from TileTypes, which holds all of the information of the tile preset. I also have a Tile class that gets attached to every generated
            tile, so that we can access information on that specific tile, hence the MonoBehavior.
          </p>
          <p>
            This also allows me to have a theoretically infinite amount of tilesets, and I can individually edit the information required for each tileset
            as well.
          </p>
          <p>
            NOTE: It is very important that Tile.cs gets attached to the tile presets in the editor!
          </p>
        </div>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <p>
            TileType.cs
          </p>
          <pre id="code">{TileTypes}</pre>
        </div>
        <div className = "code-box">
          <p>
            TileSets.cs
          </p>
          <pre id="code">{TileSets}</pre>
        </div>
        <div className = "code-box">
          <p>
            Tile.cs
          </p>
          <pre id="code">{Tile}</pre>
        </div>
      </div>

      <div className = "big-text-box">
        <p>
          After creating presets and assigning our values/references, we can start by generating terrain. Originally, I simply
          iterated down a list of vectors based on the size of the map specified, but I recently improved the algorithm to generate 
          the terrain using dictionaries instead. This lets me access any tile's information very quickly, and this is necessary for
          creating the pathfinding graph later. 
        </p>
        <p>
          I have a surface-level TileMap class that branches into the machinery in a way, as different tilesets will have different criteria 
          for generating maps and their associated pathfinding graphs. Each tileset has a related generation script that handles generating
          the data for the map, rendering it, and then laying the graph on top. The TileMap class also lets me store the resultant graph and 
          walkable nodes for usage in other classes.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <p>
            TileMap.cs
          </p>
          <pre id="code">{TileMap}</pre>
        </div>
        <div className = "code-box">
          <p>
            GrassyHills.cs
          </p>
          <pre id="code">{GenerateGrassyHillsPart1}</pre>
        </div>
      </div>
      <div className = "big-text-box">
        <p>
          I start off by defining the dictionary, which has its key set as a vector3, which will be the tile's location.
          Accessing the tile's location will give us the associated tile from the tileset. Then, I roll a random chance each
          for elevation and for the terrain type. Since dictionaries by definition cannot have duplicate keys, we can run these
          chances on every tile in order to introduce more variety into the terrain, as new tiles can never occupy the same space
          as a tile that's already been defined.
        </p>
      </div>

      <div className = "code-box">
        <p>
          GrassyHills.cs
        </p>
        <pre id="code">{GenerateGrassyHillsPart2}</pre>
      </div>
      <div className = "big-text-box">
        <p>
          All this code block really does is generate the elevation we want based on the roll we defined earlier. As of right now, it's just a simple
          four blocks layered on top of the base if a certain elevation chance is rolled, with an additional chance rolled to see if 
          two mountain tiles can spawn. This also spawns "steps" up to the higher elevation in pre-determined locations. If the threshold wasn't met, 
          then it defaults to putting a basic grassy tile at the location instead. This code is going to be expanded upon quite massively once the basic 
          gameloop quality meets my standards, and will be much more random.
        </p>
      </div>

      <div className = "code-box">
        <p>
          GrassyHills.cs
        </p>
        <pre id="code">{GenerateGrassyHillsPart3}</pre>
      </div>
      <div className = "big-text-box">
        <p>
          This does the same, except for terrain types on the base level. Because we don't see tiles that get covered by elevation tiles, elevation
          gets rolled first. Depending on whether or not destructable terrain is planned, this base terrain can be kept or the chance can be skipped entirely
          in order to save on performance.
        </p>
      </div>
      <div className = "big-text-box">
        <p>
          Now that we have generated all of the data for the tiles in our tilemap, we can use this data to also generate props for the map, such as trees,
          rocks, or even buildings. Prop asset generation follows much the same process as tiles do, with the same method used for the basic object class.
        </p>
        <p>
          NOTE: Much like Tile.cs must be attached to tile prefabs, so must Prop.cs get attached to prop prefabs.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <p>
            PropType.cs
          </p>
          <pre id="code">{PropType}</pre>
        </div>
        <div className = "code-box">
          <p>
            PropSets.cs
          </p>
          <pre id="code">{PropSets}</pre>
        </div>
        <div className = "code-box">
          <p>
            Prop.cs
          </p>
          <pre id="code">{Prop}</pre>
        </div>
      </div>
      <div className = "big-text-box">
        <p>
          A lot of the code for the prop generation looks very similar to the code I used for tile generation, since I use
          the same base dictionary method. One important disctinction, however, is that props must not spawn buried inside 
          tiles, which means we have to check whether or not there's a tile above. When creating multi-block props, we also have
          to make sure we're not going off the map by accident. The usage of dictionaries again lets us run a prop chance on every tile,
          as copies can never be made.
        </p>
      </div>

      <div className = "code-box code-box-generatepropdata">
        <p>
          GrassyHills.cs
        </p>
        <pre id="code">{GeneratePropData}</pre>
      </div>

      <div className = "big-text-box">
        <p>
          Now that we have assembled our dictionaries full of data on our tiles and our props, we can get around to actually rendering
          the map. After all, what use is data if we can't interact with it.
        </p>
      </div>

      <div className = "code-box">
        <p>
          GrassyHills.cs
        </p>
        <pre id="code">{GenerateMapVisual}</pre>
      </div>
      <div className = "big-text-box">
        <p>
          The methods used here are relatively simple. We simply iterate through our tile dictionary and spawn each tile based on 
          the TileType and the location specified. The line "tile.transform.parent = tiles.transform;" simply sets each tile's parent
          to the empty Tile GameObject in the editor window for better organization. The similar line in rendering props does the same,
          but for the props object.
        </p>
        <p>
          We also do several things here important for usage in other scripts; that being copying the TileType's information into the tile object
          itself, and doing the same for props. A new dictionary is also generated that contains each vector3 and the actual tile object itself, since
          we don't need a dictionary of TileType values anymore.
        </p>
        <p>
          A prop list gets generated as well in order to keep track of spawned props.
        </p>
      </div>

      <div className = "intro-image">
        <img src = {require('../../images/blog-images/procedural-generation/map.png')} alt = 'intro-pic'></img>
      </div>

      <div className = "big-text-box">
        <p>
          The end result is a map that is unique with every new generation. Thus, unique challenges get presented to the player in how they navigate the 
          battlefield and how they engage with the enemy. 
        </p>
        <p>
          But of course, this is just one part of a whole. We have a map now, but no way to traverse it. We can implement a grid-based tile solution,
          since we have all of the locations of the tiles set up neatly in our dictionary. The question is, how? I will cover my pathfinding solution in
          my blog about Grid-based Pathfinding, where we will look at making the map traversable, and moving units around on it.
        </p>
      </div>
    </div>
    </Layout>
  )
}

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


  
export default ProceduralGeneration;