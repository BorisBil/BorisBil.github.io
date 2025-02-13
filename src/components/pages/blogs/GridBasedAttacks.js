import '../../css/BlogPost.css'

import Layout from '../../layouts/Layout'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {    Tile, 
            CoverGeneration,
            CoverSetup, FindDistance,
            CoverWeight, AttackChance,  
            Enforcement} from './code-sections/GridBasedAttacksCode'

function GridBasedAttacks() {
    return (
        <Layout>
            <div className = "blog-post-wrapper">
                <h1 className = "blog-post-title">Grid Based Attacking</h1>

                <div className = "big-text-box">
                    <p>
                        A big part of core gameplay loops is how players use their characters to interact with the world around them. Whether that includes enemy players, bots, or even just obstacles, games are all about interactivity. 
                    </p>
                    <p>
                        Since this is a PvE turn-based strategy game, we will need to give our players the ability to attack any creepy crawlies they'll find while sleuthing around dungeons. Conversely, we'll also need to give the ability of attacking to the enemy as well, as we don't want every too many training dummies!
                    </p>
                </div>

                <div className = "big-text-box">
                    <p>
                        The idea of attacks in a turn-based game on a grid is fairly simple: one character at a time attacks another character, or takes an action, on their turn. I will be taking inspiration from the XCOM series, and will implement a system of "hit chances," with a corresponding cover system able to affect these chances. Once you start delving into making this happen, some problems start cropping up, namely: 
                    </p>
                    <p>
                        1) How do we determine what kind of cover to use for the calculation? A character can be, for example, sitting behind a simple defilade facing towards the attacker. They can also be sitting behind 2 different objects facing towards the attacker, who is attacking at a diagonal angle.
                    </p>
                    <p>
                        2) What kind of formula do we want to use for our weapons? This has a multitude of approaches, and I decide on a system with a curve that maximizes accuracy around a "sweet spot" while minimizing returns if the attack is made closer, or further, away, in order to represent how wieldy weapons are(after all, you wouldn't take a crossbow into a knife fight, would you?)
                    </p>
                </div>

                <div className = "big-text-box">
                    <p>
                        Lets start off by determing what constitutes as cover. In our map generation, we have "stepping" tiles and higher elevation tiles, such that it forms a wall relative to a lower, adjacent tile. We also have a variety of rocks, both big and small, scattered around the map. We need to be able to determine what covers what, as well as what kind of cover it provides. In this case, a "low profile" feature, such as a small rock will count as half cover, and a "high profile" feature, such as a wall, will count as full cover.
                    </p>
                </div>

                <div className = "intro-image">
                    <img src = {require('../../images/blog-images/gridbased-attacks/coverex.jpg')} alt =    'intro-pic'></img>
                </div>

                <div className = "big-text-box">
                    <p>
                        Code-wise, implementing this is actually pretty simple. Remember this snippet back in map generation?
                    </p>
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {Tile}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                    <p>
                        We will be populating the coverOnTile dictionary on map generation by checking each walkable node's (as we don't need to check untraversable tiles) direction for possible cover objects by checking tiles and props. This rather fat code section is essentially just that, plus noting what kind of cover it is.
                    </p>
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {CoverGeneration}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        With each tile's cover being determined now, lets start addressing the first problem. XCOM's cover system simply provides a percentage hit chance reduction if the cover the attackee is sitting behind is deemed as in the way. I believe this is a bit too simple, and I want to factor in the closest sides applicable to the situation. 
                    </p>
                </div>

                <div className = "big-box">
                    <div className = "image-box">
                        <img src = {require('../../images/blog-images/gridbased-attacks/weightex.jpg')} alt = 'intro-pic'/>
                    </div>
                    <div className = "image-box">
                        <img src = {require('../../images/blog-images/gridbased-attacks/coverpick.jpg')} alt = 'intro-pic'/>
                    </div>
                </div>
                <div className = "big-text-box">
                    <p>
                        This effectively accounts for shooting angles, with the green characters getting a better hit chance on the white character as the big rock cover becomes less and less weighted in the calculation as it is less "in the way" and the white character benefits from no cover if the attacker is at a 90 degree angle. 
                    </p>
                    <p>
                        We need to start by determining the distance between the attacker and the defender on all 3 axis, and then using the x and y differentials to determine which covers to select. This is pretty simple: we can just take the float of the attacker and the defender along the x and y axis and determine what sides they are attacking from by seeing if it's a positive or a negative value. We also find the Euclidian distance between the 2 units involved using the distance formula.
                    </p>
                </div>

                <div className = "big-box">
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {CoverSetup}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {FindDistance}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>

                <div className = "big-text-box">
                    <p>
                        Next, we need to figure out how to weigh each cover. This is fairly simple: we use the fraction each differential makes when both are added together.
                    </p>
                    <div className = "code-box">
                        <pre id="code">
                            <SyntaxHighlighter language="csharp" style={docco}>
                                {CoverWeight}
                            </SyntaxHighlighter>
                        </pre>
                    </div>
                </div>
                <div className = "big-text-box">
                    <p>
                        Now that we have the weights we need, it is time to address question 2. These are the factors to consider when trying to come up with a formula: weapon accuracy, height difference, distance, weapon max range, and the cover we just weighed. I also mentioned wanting a curve for each weapon that centers around a sweetspot, meaning a trigonometry function has to get involved (I use an offset Cos in this case). All of that results in an equation that looks like this:
                    </p>
                </div>
                <div className = "intro-image">
                    <img src = {require('../../images/blog-images/gridbased-attacks/equation.jpg')} alt =    'intro-pic'></img>
                </div>
                <div className = "big-text-box">
                    <p>
                        a = accuracy (decimal between 0 and 1)
                    </p>
                    <p>
                        d = z height difference (whole positive numbers)
                    </p>
                    <p>
                        p = x cover weight (decimal between 0 and 1)
                    </p>
                    <p>
                        c = x cover type (0.5, 0.75, or 1)
                    </p>
                    <p>
                        p = y cover weight (decimal between 0 and 1)
                    </p>
                    <p>
                        c = y cover type (0.5, 0.75, or 1)
                    </p>
                    <p>
                        x = distance (whole positive numbers)
                    </p>
                    <p>
                        m = weapon max range (whole positive number)
                    </p>
                </div>

                <div className = "big-text-box">
                    <p>
                        And a graph with the following curvature, assuming the weapon has 70% accuracy, 10 max range, and the attack is being made from the side directly at the same elevation with the target being out of cover:
                    </p>
                </div>
                <div className = "intro-image">
                    <img src = {require('../../images/blog-images/gridbased-attacks/equation_graph.jpg')} alt =    'intro-pic'></img>
                </div>
                <div className = "big-text-box">
                    <p>
                        The C# implementation looks like this:
                    </p>
                </div>
                <div className = "code-box">
                    <pre id="code">
                        <SyntaxHighlighter language="csharp" style={docco}>
                            {AttackChance}
                        </SyntaxHighlighter>
                    </pre>
                </div>
                
                <div className = "big-text-box">
                    <p>
                        And now, we can finish up with some enforced minimums, while simplifying melee weapons to hit based on their innate accuracy. While we're at it, we can handle HP totals and checking if we need to despawn enemies.
                    </p>
                </div>
                <div className = "code-box">
                    <pre id="code">
                        <SyntaxHighlighter language="csharp" style={docco}>
                            {Enforcement}
                        </SyntaxHighlighter>
                    </pre>
                </div>
                <div className = "big-text-box">
                    <p>
                        That about wraps it up for attacks! This function is useful for both player attacks and enemy attacks, as implementing two different systems is probably a bit too much. Feel free to tweak the formula however you choose!
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default GridBasedAttacks