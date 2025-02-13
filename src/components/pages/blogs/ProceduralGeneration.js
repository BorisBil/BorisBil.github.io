import '../../css/BlogPost.css'

import Layout from '../../layouts/Layout'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {  Tile, TileMap, 
          GenerateGrassyHillsPart2, GenerateGrassyHillsPart3,
          Prop, GenerateMapVisual, GeneratePropData } from './code-sections/ProceduralGenerationCode'

function ProceduralGeneration() {
  return (
    <Layout>
    <div className = "blog-post-wrapper">
      <h1 className = "blog-post-title">Procedural Map Generation</h1>
      <div className = "intro-image">
        <img src = {require('../../images/blog-images/procedural-generation/intro-image.png')} alt = 'intro-pic'/>
      </div>
      
      <div className = "big-text-box">
        <p>
          The single most important element in any video game is the <b>core gameplay loop</b>. This is what people consume games for; they are looking for fun and satisfying mechanics to have fun with, whether that is city management, a 4x space game, or just running around shooting things. A strong core gameplay loop provides the foundation for a fantastic game. 
        </p>
        <p>
          Maps (or levels) exist to showcase this loop. Well designed maps are important at every stage of the game, whether the level serves as an introduction to new mechanics, or as a late-game challenge requiring full knowledge of the game's mechanics to overcome. In my Unity game Fantasy Tactics, I build procedurally generated levels that are planned to get progressively more difficult as the player party delves deeper into a dungeon. A basic template system serves as the foundation, enabling future expansions like improvements to generation algorithms and the introduction of new assets. Preset asset classes are used to generate the map and a pathfinding map is overlaid on top.
        </p>
      </div>

      <div className = "big-box">
        <div className = "image-box">
          <img src = {require('../../images/blog-images/procedural-generation/overall-set.png')} alt = 'intro-pic'/>
        </div>
        <div className = "code-box">
          <pre id = "code">
            <SyntaxHighlighter language = "csharp" style={docco}>
              {Tile}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
        
      <div className = "big-text-box">
        <p>
          Before we generate any maps, we have to define the actual objects that we are going to be using in our map. Since I wanted to be able to add, delete, and edit values of tiles inside tilesets in the editor, I have a TileSets class that inherits from a TileTypes class and holds all of the information of the tile preset. There is a Tile class that gets attached to every generated tile so that we can access information on that specific tile. Because this object needs to get rendered, it has to inherit from MonoBehaviour.
        </p>
        <p>
          This also allows me to have a theoretically infinite amount of tilesets, and I can  edit the information required for each tileset individually as well.
        </p>
        <p>
          NOTE: It is very important that Tile.cs gets attached to the tile presets in the editor!
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {TileMap}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
      <div className = "big-text-box">
        <p>
          After creating presets and assigning our values/references, we can start generating terrain. Originally, I simply iterated down a list of vectors based on the size of the map specified, but I recently improved the algorithm to generate terrain using dictionaries instead. This lets me access any tile's information very quickly, and is necessary for creating the pathfinding graph later. 
        </p>
        <p>
          I have a surface-level TileMap class that branches into the machinery, as different tilesets will have different criteria for generating maps and their associated pathfinding graphs. Each tileset has a related generation script that handles generating the data for the map, rendering it, and then laying the graph on top. The TileMap class also lets me store the resultant graph and walkable nodes for other usages.
        </p>
        <p>
          I start off by defining the dictionary, which has its key set as a vector3, which will be the tile's location. Accessing the tile's location will give us the associated tile from the tileset. Then, I roll a random chance each for elevation and for the terrain type. Since dictionaries by definition cannot have duplicate keys, we can run these chances on every tile in order to introduce more variety into the terrain.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {GenerateGrassyHillsPart2}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
      
      <div className = "big-text-box">
        <p>
          All this code block does is generate the elevation based on the roll. As of right now, it's just a simple four blocks layered on top of the base if a certain elevation chance is rolled, with an additional chance rolled to see if two mountain tiles can spawn. This also spawns "steps" up to the higher elevation in pre-determined locations. If the threshold wasn't met, then it defaults to putting a grassy tile at the location instead. This code is going to be expanded upon once the basic gameloop quality meets my standards, and will be much more random.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {GenerateGrassyHillsPart3}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
      
      <div className = "big-text-box">
        <p>
          This does the same, except for terrain types on the base level. Because we don't see tiles that get covered by elevation tiles, elevation gets rolled first. Depending on whether or not destructable terrain is planned, this base terrain can be kept or the chance can be skipped entirely in order to save on performance.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {Prop}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>

      <div className = "big-text-box">
        <p>
          Now that we have generated all of the data for the tiles in our tilemap, we can use this data to generate props for the map, such as trees, rocks, or even buildings. Prop asset generation follows the same process as tiles do, with the same method used for the basic object class.
        </p>
        <p>
          NOTE: Much like Tile.cs must be attached to tile prefabs, so must Prop.cs get attached to prop prefabs.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {GeneratePropData}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
      <div className = "big-text-box">
        <p>
          Prop generation looks very similar to the code I used for tile generation, since I use the same dictionary method. One important distinction, however, is that props must not spawn buried inside tiles, which means we have to check whether or not there's a tile above. When creating multi-block props, we also have to make sure we're not going off-map by accident. The usage of dictionaries again lets us run a prop chance on every tile, as copies can never be made.
        </p>
        <p>
          Now that we have assembled our dictionaries full of data on our tiles and our props, we can get around to actually rendering the map.
        </p>
      </div>

      <div className = "big-box">
        <div className = "code-box">
          <pre id="code">
            <SyntaxHighlighter language="csharp" style={docco}>
              {GenerateMapVisual}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>

      <div className = "big-text-box">
        <p>
          The methods used here are relatively simple. We simply iterate through our tile dictionary and spawn each tile based on the TileType and the location specified. The line "tile.transform.parent = tiles.transform;" simply sets each tile's parent to the empty Tile GameObject in the editor window for better organization. The similar line in rendering props does the same, but for the props object.
        </p>
        <p>
          We also do several things here important for usage in other scripts; that being copying the TileType's information into the tile object
          itself, and doing the same for props. A new dictionary is also generated that contains each vector3 and the actual tile object itself, since
          we don't need a dictionary of TileType values anymore.
        </p>
        <p>
          A prop list gets generated to keep track of spawned props.
        </p>
      </div>

      <div className = "intro-image">
        <img src = {require('../../images/blog-images/procedural-generation/map.png')} alt = 'intro-pic'></img>
      </div>

      <div className = "big-text-box">
        <p>
          The end result is a map that is unique with every new generation. Thus, unique challenges get presented to the player in how they navigate the battlefield and how they engage with the enemy. 
        </p>
        <p>
          But of course, this is just one part of a whole. We have a map now, but no way to traverse it. We can implement a grid-based tile solution, since we have all of the locations of the tiles set up neatly in our dictionary. The question is, how? I will cover my pathfinding solution in
          my blog about Grid-based Pathfinding, where we will look at making the map traversable and moving units around on it.
        </p>
      </div>
    </div>
    </Layout>
  )
}

export default ProceduralGeneration;