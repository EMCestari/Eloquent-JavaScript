// These strings represent the roads in the city, from which we will build the graph.
const roads = [
    "Alice's House-Bob's House",     "Alice's House-Cabin",
    "Alice's House-Post Office",     "Bob's House-Town Hall",
    "Daria's House-Ernie's House",   "Daria's House-Town Hall",
    "Ernie's House-Grete's House",   "Grete's House-Farm",
    "Grete's House-Shop",            "Marketplace-Farm",
    "Marketplace-Post Office",       "Marketplace-Shop",
    "Marketplace-Town Hall",         "Shop-Town Hall"
];

/*
The array of string isn't very easy to work with.
This function will convert the list of roads to a better data structure.
It basically creates, for a given array of edges, a map object that, for each node, stores an array of connected nodes.
 */
function buildGraph(edges) {
    let graph = Object.create(null);

    //This function gets two strings, a starting location and a destination
    function addEdge(from, to){
        if (graph[from] == null) {
            // If the graph doesn't contain an array for the starting location, it creates it and adds the destination to it.
            graph[from] = [to];
        } else {
            // If the graph already contains an array for the starting location, it just adds the destination to it.
            graph[from].push(to);
        }
    }

    // Map is used to apply the split method to each couple of edges
    // The split method is used to create a two element array from a road string (in the form Start-End)
    // At that point I have an array of two element arrays (in the form [from,to])
    for (let [from,to] of edges.map(r => r.split("-"))){
        // For each two element array [from,to], I call the addEdge function two times
        addEdge(from,to);
        addEdge(to,from);
    }

    return graph;

    /*
    At the end, I have a graph in this form:
    {Alice's House: Array(3), Bob's House: Array(2), Cabin: Array(1), Post Office: Array(2), Town Hall: Array(4), …}
        Alice's House: (3) ["Bob's House", 'Cabin', 'Post Office']
        Bob's House: (2) ["Alice's House", 'Town Hall']
        Cabin: ["Alice's House"]
        Daria's House: (2) ["Ernie's House", 'Town Hall']
        Ernie's House: (2) ["Daria's House", "Grete's House"]
        Farm: (2) ["Grete's House", 'Marketplace']
        Grete's House: (3) ["Ernie's House", 'Farm', 'Shop']
        Marketplace: (4) ['Farm', 'Post Office', 'Shop', 'Town Hall']
        Post Office: (2) ["Alice's House", 'Marketplace']
        Shop: (3) ["Grete's House", 'Marketplace', 'Town Hall']
        Town Hall: (4) ["Bob's House", "Daria's House", 'Marketplace', 'Shop']
     */
}

const roadGraph = buildGraph(roads);

class VillageState {
    // A Village State is defined through the place where the robot is and the parcels it is bringing.
    constructor(place,parcels){
        this.place = place;
        this.parcels = parcels;
    }

    // The move method is where the action happens
    move(destination) {
        // It checks whether there is a road going from the current place to the destination
        if (!roadGraph[this.place].includes(destination)) {
            // if not, it returns the old state (since it is not a valid move)
            return this;
        } else {
            let parcels = this.parcels.map(p => { // The call to map takes care of the moving
                if (p.place != this.place) return p;
                return {place: destination, address:p.address};
            }).filter(p => p.place != p.address); // The call to filter does the delivering
            return new VillageState(destination, parcels); // It creates a new state with the destination as the robot's new place, with the parcels it is carrying.
        }
        // This method leaves the old village state intact.
    }
}

