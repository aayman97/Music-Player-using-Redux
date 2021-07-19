import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { connect } from "react-redux";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import songs from "../data";

const { height, width } = Dimensions.get("screen");

const MediaPlayer = ({ media, addSong, addLength }) => {
  const [loading, setLoading] = React.useState(true);
  const [length, setLength] = React.useState(0);
  const [playing, setIsPlaying] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [playButtonLoading, setPlayButtonLoading] = React.useState(false);

  async function playSound() {
    console.log("Playing Sound");
    await media.song.sound.playAsync();
  }

  async function pauseSound() {
    console.log("pausing Sound");
    await media.song.sound.pauseAsync();
  }

  async function getSong(index) {
    const playbackObj = await Audio.Sound.createAsync(
      songs[index].url,
      {
        shouldPlay: true,
        isLooping: true,
      },
      (playbackTime) => {
        addLength(playbackTime.positionMillis);
        setIsPlaying(playbackTime.isPlaying);
      }
    );
    console.log("Loading Sound");
    addSong(playbackObj);
    setLoading(false);
  }

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  React.useEffect(() => {
    getSong(index);
  }, [index]);

  React.useEffect(() => {
    if (media.length) {
      console.log("media.length : ", media.length);
      setLength((media.length / media.song.status.durationMillis) * 100);
      // console.log(
      //   msToTime((length / 100) * media.song.status.durationMillis + 500)
      // );

      console.log("duration : ", media.song.status.durationMillis);

      if (media.length + 100 >= media.song.status.durationMillis) {
        console.log("song has finished");
        if (index >= songs.length - 1) {
          setIndex(0);
        } else {
          setIndex(index + 1);
        }

        setLength(0);
        media.song.sound.unloadAsync();
      }
    }
  }, [media.length]);

  LogBox.ignoreAllLogs(true);

  if (!loading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width,
            height: height * 0.08,
            position: "absolute",
            top: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <AntDesign name="search1" size={27} color="black" />
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={songs[index].artwork}
          style={{ width, height, position: "relative", zIndex: -1 }}
          resizeMode="cover"
        >
          <View
            style={{
              width,
              position: "absolute",
              height: height * 0.2,
            }}
          >
            <LinearGradient
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                top: height * 0.61,
              }}
              colors={[
                "transparent",
                "rgba(24,26,51,0.3)",
                "rgba(24,26,51,0.2)",
                "transparent",
              ]}
            >
              <View>
                <Text
                  style={{
                    color: "#f5f5f5",
                    fontSize: 30,
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  {songs[index].title}
                </Text>
                <Text
                  style={{ color: "#f5f5f5", fontSize: 16, fontWeight: "400" }}
                >
                  {songs[index].artist}
                </Text>
              </View>

              <AntDesign name="hearto" size={30} color="white" />
            </LinearGradient>
          </View>
        </ImageBackground>

        <View
          style={{
            position: "absolute",
            width,
            height: height * 0.34,
            alignItems: "center",
            justifyContent: "center",
            bottom: 0,
            zIndex: -1,
          }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "transparent",
              "transparent",
              "rgba(24,26,51,0.5)",
              "rgba(24,26,51,0.6)",
              "rgba(24,26,51,0.7)",
              "rgba(24,26,51,0.8)",
              "rgba(24,26,51,0.9)",
              "rgba(24,26,51,0.92)",
              "rgba(24,26,51,0.94)",
              "rgba(24,26,51,0.96)",
              "rgba(24,26,51,0.98)",
              "rgba(24,26,51,1)",
            ]}
            style={{
              width,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Slider
              style={{
                width: "145%",
                height: "20%",
                marginTop: 70,
                transform: [
                  {
                    scale: 0.7,
                  },
                ],
              }}
              minimumValue={0}
              maximumValue={100}
              value={length}
              shouldRasterizeIOS={true}
              thumbTintColor="#684892"
              minimumTrackTintColor="#684892"
              onSlidingComplete={(value) => {
                media.song.sound.setPositionAsync(
                  (value / 100) * media.song.status.durationMillis
                );
                console.log(
                  (value / 100) * media.song.status.durationMillis + 510
                );
              }}
            />

            <View
              style={{
                width,
                height: height * 0.02,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: "white" }}> {msToTime(media.length)} </Text>
              <Text style={{ color: "white" }}>
                {" "}
                {msToTime(media.song.status.durationMillis)}{" "}
              </Text>
            </View>

            <View
              style={{
                height: "50%",
                width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 40 }}
                onPress={() => {
                  setPlayButtonLoading(true);
                  if (index <= 0) {
                    setIndex(songs.length - 1);
                    setLength(0);
                    media.song.sound.unloadAsync();
                  } else {
                    setLength(0);
                    media.song.sound.unloadAsync();
                    setIndex(index - 1);
                  }
                  setTimeout(() => {
                    setPlayButtonLoading(false);
                  }, 100);
                }}
              >
                <AntDesign name="stepbackward" size={40} color="white" />
              </TouchableOpacity>

              {!playing ? (
                <TouchableOpacity
                  onPress={playSound}
                  disabled={!playButtonLoading ? false : true}
                >
                  {!playButtonLoading ? (
                    <AntDesign name="play" size={80} color="white" />
                  ) : (
                    <View
                      style={{
                        width: 79,
                        height: 79,
                        borderRadius: 79,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="black" />
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pauseSound}>
                  {!playButtonLoading ? (
                    <AntDesign name="pausecircle" size={80} color="white" />
                  ) : (
                    <View
                      style={{
                        width: 79,
                        height: 79,
                        borderRadius: 79,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="black" />
                    </View>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{ marginLeft: 40 }}
                onPress={() => {
                  setPlayButtonLoading(true);
                  if (index >= songs.length - 1) {
                    setLength(0);
                    media.song.sound.unloadAsync();
                    setIndex(0);
                  } else {
                    setLength(0);
                    media.song.sound.unloadAsync();
                    setIndex(index + 1);
                  }
                  setTimeout(() => {
                    setPlayButtonLoading(false);
                  }, 100);
                }}
              >
                <AntDesign name="stepforward" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> Loading </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

function mapStateToProps(state) {
  return {
    media: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSong: (item) => dispatch({ type: "ADD_SONG", payload: item }),
    addLength: (item) => dispatch({ type: "ADD_LENGTH", payload: item }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
