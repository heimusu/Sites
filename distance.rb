def sim_distance(prefs, person1, person2)
    shared_items_a = shared_items_a(prefs,person1, person2)
    return 0 if shared_items_a.size == 0
    sum_of_squares = shared_items_a.inject(0){ |result,items|
        result + (prefs[person1][item] - prefs[person2][item]) ** 2
    }

    return 1/(1+sum_of_squares)
end

def shared_items_a(prefs,person1,person2)
    prefs[person1].keys & prefs[person2].keys
end
