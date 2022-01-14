const default_db_size = 2500000

struct DB
    nodes_dmp::String
    names_dmp::String
    parents::Dict{Int,Int}
    ranks::Dict{Int,Symbol}
    names::Dict{Int,String}
end

Base.show(io::IO, db::DB) = print(io, "Taxonomy.DB(\"$(db.nodes_dmp)\",\"$(db.names_dmp)\")")

"""
    Taxonomy.DB

# Constructors
```julia
DB(nodes_dmp::String, names_dmp::String)
DB(db_path::String, nodes_dmp::String, names_dmp::String)
```
Create DB(taxonomy database) object from nodes.dmp and names.dmp files.
You can specify the paths of the nodes.dmp and names.dmp files, or the directory where they exist and the names.
"""

function DB(nodes_dmp::String, names_dmp::String)
    @assert isfile(nodes_dmp)
    @assert isfile(names_dmp)

    parents, ranks = importnodes(nodes_dmp)
    namaes = importnames(names_dmp)

    return DB(nodes_dmp, names_dmp, parents, ranks, namaes)
end

function DB(db_path::String, nodes_dmp::String, names_dmp::String)
    @assert ispath(db_path)

    nodes_dmp_path = joinpath(db_path, nodes_dmp)
    names_dmp_path = joinpath(db_path, names_dmp)

    return DB(nodes_dmp_path, names_dmp_path)
end

function importnodes(nodes_dmp_path::String)
    parents = Tuple{Int,Int}[]
    ranks = Tuple{Int,Symbol}[]
    resize!(parents, default_db_size)
    resize!(ranks, default_db_size)

    f = open(nodes_dmp_path, "r")
    c = 0
    for line in eachline(f)
        cols = split(line, "\t")
        taxid = parse(Int, cols[1])
        parent = parse(Int, cols[3])
        rank = Symbol(cols[5])

        parent != taxid || continue
            
        c += 1
        parents[c] = (taxid, parent)
        ranks[c] = (taxid, rank)
    end
    resize!(parents, c)
    resize!(ranks, c)
    close(f)
    return Dict(parents), Dict(ranks)
end

function importnames(names_dmp_path::String)
    namaes = Tuple{Int,String}[]
    resize!(namaes, default_db_size)

    f = open(names_dmp_path, "r")
    c = 0
    for line in eachline(f)
        cols = split(line, "\t")
        if cols[7] == "scientific name"
            taxid = parse(Int, cols[1])
            name = cols[3]

            c+=1
            namaes[c] = (taxid, name)
        end
    end
    close(f)
    resize!(namaes, c)
    return Dict(namaes)
end