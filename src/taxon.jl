abstract type AbstractTaxon end

struct Taxon{T} <: AbstractTaxon where T<:Rank
    taxid::Int
    name::String
    rank::T
    db::DB
end

# define Traits
AbstractTrees.ParentLinks(::Type{Taxon}) = StoredParents()
AbstractTrees.ChildIndexing(::Type{Taxon}) = IndexedChildren()
AbstractTrees.NodeType(::Type{Taxon}) = HasNodeType()
AbstractTrees.nodetype(::Type{Taxon}) = Taxon

"""
    parent(taxon::Taxon)

Return the `Taxon` object that is the parent of the given `Taxon` object.
"""
function AbstractTrees.parent(taxon::Taxon)
   parent_taxid = get(taxon.db.parents, taxon.taxid, nothing)
   if parent_taxid === nothing
        return nothing
   end
   parent = Taxon(parent_taxid, taxon.db)
   return parent
end

"""
    children(taxon::Taxon)

Return the vector of `Taxon` objects that are children of the given `Taxon` object.
"""
function AbstractTrees.children(taxon::Taxon)
    children_taxid = findall(isequal(taxon.taxid), taxon.db.parents)
    children_taxon = map(x -> Taxon(x, taxon.db), children_taxid)
    return children_taxon
end

Base.show(io::IO, taxon::Taxon) = print(io, "$(taxon.taxid) [$(taxon.rank)] $(taxon.name)")
AbstractTrees.printnode(io::IO, taxon::Taxon) = print(io, taxon)

function Taxon(taxid::Int, db::DB)
    name = db.names[taxid]
    rank = Rank(get(db.ranks, taxid, Symbol("no rank")))
    
    return Taxon(taxid, name, rank, db)
end

function Taxon(name::String, db::DB)
    taxid_canditates = findall(isequal(name), db.names)
    length(taxid_canditates) == 0 && error("There is no candidates for ",name)
    length(taxid_canditates) == 1 && return Taxon(taxid_canditates[1],db)
    length(taxid_canditates) > 1 && error("There are several candidates for ",name)
end

"""
    get(db::Taxonomy.DB, taxid::Int, default)

Return the `Taxon` object stored for the given taxid, or the given default value if no mapping for the taxid is present.
"""
function Base.get(db::DB, taxid::Int, default)
    try
        return Taxon(taxid, db)
    catch
        return default
    end
end

"""
    get(db::Taxonomy.DB, name::String, default)

Return the `Taxon` object stored for the given name, or the given default value if no mapping for the name is present.
"""
function Base.get(db::DB, name::String, default)
    try
        return Taxon(name, db)
    catch
        return default
    end
end

"""
    taxid(taxon::Taxon)

Return the taxid of the given `Taxon` object.
"""
taxid(taxon::Taxon) = taxon.taxid

struct UnclassifiedTaxon <:AbstractTaxon
    name::String
    rank::Rank
    source::Taxon
end

function UnclassifiedTaxon(rank, source)
    name = "unclassified " * source.name * " " * String(rank)
    UnclassifiedTaxon(name, rank, source)
end

Base.show(io::IO, taxon::UnclassifiedTaxon) = print(io, "Unclassified [$(String(rank(taxon.rank)))] $(taxon.name)")

"""
    rank(taxon::AbstractTaxon)

Return the rank of the given `Taxon` object.
It also works for an `UnclassifiedTaxon` object.
"""
function rank(taxon::AbstractTaxon)
    taxon.rank
end

"""
    name(taxon::AbstractTaxon)

Return the name of the given `Taxon` object.
It also works for an `UnclassifiedTaxon` object.
"""
function name(taxon::AbstractTaxon)
    taxon.name
end

Base.isless(x1::CanonicalRank, x2::Taxon) = isless(x1, rank(x2))
Base.isless(x1::Type{<:CanonicalRank}, x2::Taxon) = isless(x1(), x2)
Base.isless(x1::Taxon, x2::CanonicalRank) = isless(rank(x1), x2)
Base.isless(x1::Taxon, x2::Type{<:CanonicalRank}) = isless(x1, x2())
