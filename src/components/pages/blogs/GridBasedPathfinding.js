import '../../css/BlogPost.css'

import Layout from '../../layouts/Layout'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {    Node, 
            GenerateGraphPart2,
            GetDistance, Pathfinding, ReverseList  } from './code-sections/PathfindingCode'

function GridBasedPathfinding() {
    return (
        <Layout>
            <div className = "blog-post-wrapper">
                <h1 className = "blog-post-title">Grid Based A* Pathfinding</h1>
                
                <div className = "big-text-box">
                    <p>
                        Following on from the blog that covered procedurally generating a map, we now have a map generator. There are now several problems we have to address:
                    </p>
                </div>
                <div className = "big-text-box">
                    <p>
                        1) How do we calculate the movement costs associated with moving from one tile to another
                    </p>
                    <p>
                        2) How do we find the best path from our unit's location to the desired location
                    </p>
                    <p>
                        3) How do we tell our unit to start moving there
                    </p>
                </div>
                
                <div className = "big-text-box">
                    <p>
                        Since the map is randomized every time it's generated, simply baking pathfinding solutions into the map is not a great way to go about it. We will need to generate something that I will refer to henceforth as a "graph," which is simply a dictionary of Node objects that are created on every tile. This lets us define each tile's neighbors, and thus, which tiles you can move to if you have a unit on that tile. In turn, this means we are able to have any kind of pathing that we want, as neighboring tiles don't even necessarily need to be next to each other.
                    </p>
                </div>

                <div className = "big-box">
                    <div className = "code-box">
                        <pre id = "code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {Node}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        To start off, we need to create the Node class and a dictionary of nodes. If you want to save on performance, you can skip tiles that are buried and will never get used. We will go through each spawned tile because of the plan to have underground enemies in the future. Regardless of that, we still need to set every node's walkability, and we do that by checking the tile's type, the tile's props, and whether or not any other tiles spawned on top.
                    </p>
                </div>

                <div className = "big-text-box">
                    <p>
                        Now that we've created a Node object at each tile location, we need to go through each node and find their neighbors. We want to add nodes that are next to each other, and if a half-step between elevations exists, we want to add those too. 
                    </p>
                    <p>
                        NOTE: This is really just a lot of if statements as we have to check each possible location for neighbors. A switch case will be employed in the future to clean up the code.
                    </p>
                </div>

                <div className = "big-box">
                    <div className = "code-box">
                        <pre id = "code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {GenerateGraphPart2}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        Now that the pathfinding graph is done generating, we want to be able to use it to move our units around, whether they are enemy units or our own units. As such, our pathfinding algorithm will be sitting in our TileMap.cs file so that it can be access by our gameloop scripts in the future.
                    </p>
                    <p>
                        Speaking of pathfinding algorithms, how exactly will we actually calculate the shortest path between two tiles? There's quite a lot of research and mathematical postulating on the subject of pathfinding algorithms, with no one method being deemed "the best," some being more expensive but delivering higher quality paths, while others are extremely cheap by not producing the best results. Balancing the performance and the quality aspect here is extremely important, and as we're only calculating the path of one unit at a time, an expensive algorithm can be used to provide us a result that users might consider more natural.
                    </p>
                    <p>
                        Dijkstra's algorithm is one that comes to mind almost immediately. In summation, it works by visiting every possible node that it can see until all options are exhausted, while keeping tabs on the shortest path, until it comes to the destination node. This algorithm is, performance-wise, the most expensive there is, however, it provides the shortest path to the target every single time.
                    </p>
                    <p>
                        A common alternative to Dijkstra's is the A* algorithm, which is very similar but has one exception: it employs the usage of heuristic values in order to find the end node more quickly. Instead of branching out at the start like Dijkstra's algorithm does, A* first goes directly towards the target node, until it hits an obstacle. From there, it branches out, and keeps going until it's gone around the obstacle and found the node. The result is a path that might be slightly worse than Dijkstra's, but much less performance intensive. However, the final path is usually so close to Dijkstra's result that fundamentally there isn't really a difference, at least where grid based pathfinding is concerned. In addition, you can further improve on the algorithm by using Priority Queues, but we won't be using them in this project as we're only doing the pathfinding for one unit at a time. We will be making ample usage of the A* algorithm.
                    </p>
                </div>

                <div className = "big-box">
                    <div className = "image-box">
                        <img src = {require('../../images/blog-images/gridbased-pathfinding/Dijkstra_Animation.gif')} alt = 'Dijkstra_Animation'></img>
                    </div>
                    <div className = "small-text-box">
                        <p>
                            Djikstra's Algorithm
                        </p>
                    </div>
                </div>
                <div className = "big-box">
                    <div className = "image-box">
                        <img src = {require('../../images/blog-images/gridbased-pathfinding/Astar_progress_animation.gif')} alt = 'Astar_progress_animation'></img>
                    </div>
                    <div className = "small-text-box">
                        <p>
                            A* Algorithm
                        </p>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        Before we get started with the implementation, there is one thing we need to sort out: getting the distance between two tiles. Since we are using a tile system dealing with movement in grid based fashion, we can use calculate the differences between their x coordinates and their y coordinates to calculate the Manhattan distance. As this game also features vertical movement, we need to include the z differential as well, essentially making a 3D Manhattan distance calculator.
                    </p>
                </div>
                <div className = "big-box">
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {GetDistance}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        Now that we have all of the supporting functions that we need, we can implement the pathfinding algorithm itself. 
                    </p>
                </div>
                <div className = "big-box">
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {Pathfinding}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        This code block might look complicated, but it's actually quite simple. We get the start and end nodes, then initialize an open list and a dictionary that keeps track of movement costs. Then, we select the node with the
                        lowest "f" cost, which is a combination of the cost to reach the node from the start node and an estimate of the cost to reach the end node. This node is removed from the open list, and if it is the target end node, the loop ends and the finished list gets returned. Otherwise, the neighbors get checked, and if it is walkable and not yet evaluated or the evaluated cost is less than the previously recorded cost, the cost so far gets updated and the neighbor node gets added to the open list. This continues on until either the end node is found or the open list in empty, in which case there is no path to the target node (and this returns an empty list).
                    </p>
                    <p>
                        Lastly, the list as it is now is actually telling us the path from the target node to the start node, so we need to reverse the output.
                    </p>
                </div>
                <div className = "big-box">
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {ReverseList}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        Now that all the math is done, we need to be able to tell our unit to move along the desired path. This is very simple as you just click on the unit, right click on a tile, and the algorithm will work it out. For the enemy's turn, movements will happen for them based on calculations determining the best tile for them to move to. How you determine that is based entirely on what kind of behaviors you want from any specific kinds of enemies you plan on adding into your game.
                    </p>
                </div>

            </div>
        </Layout>
    )
}

export default GridBasedPathfinding