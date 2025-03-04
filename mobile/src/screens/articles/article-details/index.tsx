import { Dispatch, StateInterface } from "../../../redux";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import React, { FC, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Article } from "../../../_common/types";
import { ArticlesScreenState } from "../../../redux/reducers/articles-screen";
import { DZCodeLoading } from "../../../components/loading";
import { GeneralState } from "../../../redux/reducers/general";
import Markdown from "react-native-markdown-display";
import { Route } from "@react-navigation/routers";
import { Text } from "react-native-paper";
import { articleDetailsStyles } from "./styles";
import { fetchArticle } from "../../../redux/actions/articles-screen";
import { globalStyles } from "../../../styles/global";
import { openLink } from "../../../utils/link";

interface ArticleDetailsScreenProps {
  route: Route<"ArticleDetails", RouteParams>;
}

interface RouteParams {
  article: Article;
}

export const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  const { articles, refreshing } = useSelector<StateInterface, ArticlesScreenState>(
    (state) => state.articlesScreen,
  );
  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);

  const dispatch = useDispatch<Dispatch<ArticlesScreenState>>();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchArticle(route.params.article.slug));
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainView}>
      {refreshing ? (
        <View style={globalStyles.centerView}>
          <DZCodeLoading />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{
              uri: articles?.find((article) => article.slug === route.params.article.slug)?.image,
            }}
            style={articleDetailsStyles.image}
          />
          <Markdown
            style={{
              text: {
                color: theme === "dark" ? "white" : "black",
              },
              bullet_list: {
                color: theme === "dark" ? "white" : "black",
              },
              ordered_list: {
                color: theme === "dark" ? "white" : "black",
              },
              fence: {
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "black" : "white",
              },
              blockquote: {
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "black" : "white",
              },
              body: articleDetailsStyles.mdBody,
            }}
            onLinkPress={(url) => {
              openLink(url, navigation);
              return true;
            }}
          >
            {articles?.find((article) => article.slug === route.params.article.slug)?.content || ""}
          </Markdown>
          <Text style={articleDetailsStyles.authorsText}>
            Authors:{" "}
            {articles
              ?.find((article) => article.slug === route.params.article.slug)
              ?.authors?.join(", ")}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
