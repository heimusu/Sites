from math import sqrt

# Euclid distance
def sim_distance(prefs,person1,person2):
    si={}
    for item in prefs[person1]:
        if item in prefs[person2]:
            si[item]=1
    if len(si)==0:
        return 0
    sum_of_squares = sum([pow(prefs[person1][item]-prefs[person2][item],2)
                        for item in prefs[person1] if item in prefs[person2]])
    return 1/(1+sum_of_squares)

# Pearson correlation coefficient
def sim_pearson(prefs,p1,p2):
    si={}
    for item in prefs[p1]:
        if item in prefs[p2]:
            si[item]=1
    n = len(si)

    if n==0:
        return 0
    sum1 = sum([prefs[p1][it] for it in si])
    sum2 = sum([prefs[p2][it] for it in si])

    sum1Sq = sum([pow(prefs[p1][it],2) for it in si])
    sum2Sq = sum([pow(prefs[p2][it],2) for it in si])

    pSum = sum([prefs[p1][it] * prefs[p2][it] for it in si])

    num = pSum - (sum1*sum2/n)
    den = sqrt((sum1Sq - pow(sum1,2)/n) * (sum2Sq - pow(sum2,2)/n))
    if den==0: return 0

    r = num/den
    return r

critics={
'Lisa':{'A':2.5,'B':3.5,'C':3.0,'D':3.5,'E':2.5,'F':3.0},
'Gene':{'A':3.0,'B':3.5,'C':1.5,'D':5.0,'F':3.0,'E':3.5},
'Michael':{'A':2.5,'B':3.0,'C':3.5,'D':4.0,'E':4.0}
}

if __name__ == "__main__":
    print(sim_distance(critics,'Lisa','Gene'))
    print(sim_pearson(critics,'Lisa','Gene'))
