const Tile = 
`// Tile.cs

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

const CoverGeneration = 
` // TileMap.cs

public void GenerateMapCover()
{
    foreach (Node node in walkableNodes)
    {
        Vector3 tileLocation = node.location;

        tileMapDict[tileLocation].coverOnTile = new Dictionary<string, string>();

        if (tileMapDict.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z)))
        {
            if (tileMapDict.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z + 0.5f)))
            {
                if (propTypeMap.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z + 0.5f)))
                {
                    tileMapDict[tileLocation].coverOnTile["West"] = "Full";
                }
                else
                {
                    tileMapDict[tileLocation].coverOnTile["West"] = "Half";
                }
            }
            else if (tileMapDict.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z + 1)))
            {
                tileMapDict[tileLocation].coverOnTile["West"] = "Full";
            }
            else if (propTypeMap.ContainsKey(new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z)))
            {
                if (propTypeMap[new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z)].coverType == 1)
                {
                    tileMapDict[tileLocation].coverOnTile["West"] = "Half";
                }
                if (propTypeMap[new Vector3(tileLocation.x + 1, tileLocation.y, tileLocation.z)].coverType == 2)
                {
                    tileMapDict[tileLocation].coverOnTile["West"] = "Full";
                }
            }
            else
            {
                tileMapDict[tileLocation].coverOnTile["West"] = "None";
            }
        }

        if (tileMapDict.ContainsKey(new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z)))
        {
            if (tileMapDict.ContainsKey(new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z + 0.5f)))
            {
                if (propTypeMap.ContainsKey(new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z + 0.5f)))
                {
                    tileMapDict[tileLocation].coverOnTile["East"] = "Full";
                }
                else
                {
                    tileMapDict[tileLocation].coverOnTile["East"] = "Half";
                }
            }
            else if (tileMapDict.ContainsKey(new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z + 1)))
            {
                tileMapDict[tileLocation].coverOnTile["East"] = "Full";
            }
            else if (propTypeMap.ContainsKey(new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z)))
            {
                if (propTypeMap[new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z)].coverType == 1)
                {
                    tileMapDict[tileLocation].coverOnTile["East"] = "Half";
                }
                if (propTypeMap[new Vector3(tileLocation.x - 1, tileLocation.y, tileLocation.z)].coverType == 2)
                {
                    tileMapDict[tileLocation].coverOnTile["East"] = "Full";
                }
            }
            else
            {
                tileMapDict[tileLocation].coverOnTile["East"] = "None";
            }
        }

        if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z)))
        {
            if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z + 0.5f)))
            {
                if (propTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z + 0.5f)))
                {
                    tileMapDict[tileLocation].coverOnTile["North"] = "Full";
                }
                else
                {
                    tileMapDict[tileLocation].coverOnTile["North"] = "Half";
                }
            }
            else if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z + 1)))
            {
                tileMapDict[tileLocation].coverOnTile["North"] = "Full";
            }
            else if (propTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z)))
            {
                if (propTypeMap[new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z)].coverType == 1)
                {
                    tileMapDict[tileLocation].coverOnTile["North"] = "Half";
                }
                if (propTypeMap[new Vector3(tileLocation.x, tileLocation.y + 1, tileLocation.z)].coverType == 2)
                {
                    tileMapDict[tileLocation].coverOnTile["North"] = "Full";
                }
            }
            else
            {
                tileMapDict[tileLocation].coverOnTile["North"] = "None";
            }
        }

        if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z)))
        {
            if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z + 0.5f)))
            {
                if (propTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z + 0.5f)))
                {
                    tileMapDict[tileLocation].coverOnTile["South"] = "Full";
                }
                else
                {
                    tileMapDict[tileLocation].coverOnTile["South"] = "Half";
                }
            }
            else if (tileMapDict.ContainsKey(new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z + 1)))
            {
                tileMapDict[tileLocation].coverOnTile["South"] = "Full";
            }
            else if (propTypeMap.ContainsKey(new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z)))
            {
                if (propTypeMap[new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z)].coverType == 1)
                {
                    tileMapDict[tileLocation].coverOnTile["South"] = "Half";
                }
                if (propTypeMap[new Vector3(tileLocation.x, tileLocation.y - 1, tileLocation.z)].coverType == 2)
                {
                    tileMapDict[tileLocation].coverOnTile["South"] = "Full";
                }
            }
            else
            {
                tileMapDict[tileLocation].coverOnTile["South"] = "None";
            }
        }
    }
}`

const CoverSetup = 
`/// GameLoopController.cs

public void CalculateAttack(Unit unit, Unit enemy)
{
    unit.actionPoints = 0;

    List<string> selectedCovers = new List<string>();

    float xDifference = unit.unitPosition.x - enemy.unitPosition.x;
    float yDifference = unit.unitPosition.y - enemy.unitPosition.y;
    float zDifference = enemy.unitPosition.z - unit.unitPosition.z; 
    // NOTE: This is like this due to how zDifference is 
    // added into the calculation later on!

    float distance = DistanceBetweenUnits(unit, enemy);

    float xCover = 0;
    float yCover = 0;

    if (xDifference < 0)
    {
        selectedCovers.Add("East");
    }
    else if (xDifference >= 0)
    {
        selectedCovers.Add("West");
    }

    if (yDifference < 0)
    {
        selectedCovers.Add("South");
    }
    else if (yDifference >= 0)
    {
        selectedCovers.Add("North");
    }

    // This lets us know which covers the unit is currently using, 
    // which is updated at the end of every unit's movement
    foreach (string cover in selectedCovers)
    {
        string coverType = enemy.inCover[cover];

        if (cover == "East" || cover == "West")
        {
            if (coverType == "None")
            {
                xCover = 1;
            }
            else if (coverType == "Half")
            {
                xCover = 0.75f;
            }
            else if (coverType == "Full")
            {
                xCover = 0.5f;
            }
        }

        if (cover == "North" || cover == "South")
        {
            if (coverType == "None")
            {
                yCover = 1;
            }
            else if (coverType == "Half")
            {
                yCover = 0.75f;
            }
            else if (coverType == "Full")
            {
                yCover = 0.5f;
            }
        }
    }
`

const CoverWeight =
`/// GameLoopController.cs

float weightx = ((Mathf.Abs(xDifference)) / (Mathf.Abs(xDifference) + Mathf.Abs(yDifference)));
float weighty = ((Mathf.Abs(yDifference)) / (Mathf.Abs(xDifference) + Mathf.Abs(yDifference)));
`

const FindDistance = 
`/// GameLoopController.cs

public float DistanceBetweenUnits(Unit sender, Unit reciever)
{
    float dx = Mathf.Abs(sender.unitPosition.x - reciever.unitPosition.x);
    float dy = Mathf.Abs(sender.unitPosition.y - reciever.unitPosition.y);
    float dz = Mathf.Abs(sender.unitPosition.z - reciever.unitPosition.z);
    return Mathf.Sqrt((dx * dx) + (dy * dy) + (dz * dz));
}
`

const AttackChance = 
`/// GameLoopController.cs

chancetohit = ((unit.weapon.accuracy + (zDifference / 10)) * ((weightx * xCover) + (weighty * yCover))) * Mathf.Cos(2*((distance - unit.weapon.range + 3) / 10));
`

const Enforcement = 
`/// GameLoopController.cs

    if (unit.weapon.weaponType == "Longsword" 
        || unit.weapon.weaponType == "Shortsword"
        || unit.weapon.weaponType == "Hands")
    {
        chancetohit = unit.weapon.accuracy;
    }

    if (chancetohit <= 0)
    {
        chancetohit = 0.3f;
    }

    if (chancetohit >= 1)
    {
        chancetohit = 1;
    }

    float hitRoll = Random.Range(0.0f, 1.0f);

    if (hitRoll <= chancetohit)
    {
        int damage = Mathf.RoundToInt(Random.Range(unit.weapon.minDamage, unit.weapon.maxDamage));
        enemy.totalHP = enemy.totalHP - (damage - enemy.armorAP);
    }

    CheckIfDead(enemy);
}
`

export {    Tile, 
            CoverGeneration,
            CoverSetup, FindDistance,
            CoverWeight, AttackChance, 
            Enforcement             } 