import matplotlib.pyplot as plt
import numpy as np

trackEvents = [
    {"title": "100m", "A": 25.4347, "B": 18, "C": 1.81, "isTimed": True, "day1": True, "highScore": 10.6, "points": 952, "worldRecord": 10.55, "WRpoints": 963},
    {"title": "Long Jump", "A": 0.14354, "B": 220, "C": 1.4, "isTimed": False, "day1": True, "highScore": 689, "points": 788, "worldRecord": 780, "WRpoints": 1010},
    {"title": "Shot Put", "A": 51.39, "B": 1.5, "C": 1.05, "isTimed": False, "day1": True, "highScore": 15.14, "points": 798, "worldRecord": 16.00, "WRpoints": 851},
    {"title": "High Jump", "A": 0.8465, "B": 75, "C": 1.42, "isTimed": False, "day1": True, "highScore": 191, "points": 723, "worldRecord": 2.05, "WRpoints": 850},
    {"title": "400m", "A": 1.53775, "B": 82, "C": 1.81, "isTimed": True, "day1": True, "highScore": 47.52, "points": 933, "worldRecord": 48.42, "WRpoints": 889},
    {"title": "110m Hurdles", "A": 5.74352, "B": 28.5, "C": 1.92, "isTimed": True, "day1": False, "highScore": 14.71, "points": 885, "worldRecord": 13.75, "WRpoints": 1007},
    {"title": "Discus", "A": 12.91, "B": 4, "C": 1.1, "isTimed": False, "day1": False, "highScore": 50.66, "points": 884, "worldRecord": 50.54, "WRpoints": 882},
    {"title": "Pole Vault", "A": 0.2797, "B": 100, "C": 1.35, "isTimed": False, "day1": False, "highScore": 5.20, "points": 972, "worldRecord": 5.45, "WRpoints": 1051},
    {"title": "Javelin", "A": 10.14, "B": 7, "C": 1.08, "isTimed": False, "day1": False, "highScore": 58.18, "points": 710, "worldRecord": 71.90, "WRpoints": 918},
    {"title": "1500m", "A": 0.03768, "B": 480, "C": 1.85, "isTimed": True, "day1": False, "highScore": 280.73, "points": 676, "worldRecord": 276.11, "WRpoints": 705},
]

fig, axs = plt.subplots(5, 2, figsize=(15, 30))

for i, event in enumerate(trackEvents):
    if event["isTimed"]:
        scores = np.linspace(1.5*event["highScore"], 0, 100)
    else:
        scores = np.linspace(0, 1.5*event["highScore"], 100)
    
    if event["isTimed"]:
        points = np.round(event["A"] * np.power((event["B"] - scores), event["C"]))
    else:
        points = np.round(event["A"] * np.power((scores - event["B"]), event["C"]))

    ax = axs[i//2, i%2]
    ax.plot(scores, points, label='Points vs Score')
    ax.scatter(event["highScore"], np.round(event["A"] * np.power((event["B"] - event["highScore"] if event["isTimed"] else event["highScore"] - event["B"]), event["C"])), color='red', label='High Score')
    ax.set_title(event["title"])
    ax.set_xlabel('Score')
    ax.set_ylabel('Points')
    if event["isTimed"]: ax.invert_xaxis()
    ax.legend()
    ax.grid(True)

plt.tight_layout()
plt.show()
