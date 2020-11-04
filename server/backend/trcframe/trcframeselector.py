import numpy as np


def trc_frame_select(trc_data, frame):
    landmarks_names = trc_data['Markers']
    try:
        time, landmarks_coordinates = trc_data[frame]
    except KeyError:
        print('Frame {} not found'.format(frame))
        raise KeyError
    landmarks_names_data = [frame, time] + landmarks_coordinates
    landmarks = dict(zip(landmarks_names, landmarks_names_data))
    if 'Frame#' in landmarks:
        del landmarks['Frame#']
    if 'Time' in landmarks:
        del landmarks['Time']

    for k, v in landmarks.items():
        landmarks[k] = np.array(v)

    return landmarks
