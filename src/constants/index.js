export const TYPE_FILTERS_OPTIONS = () => {
  return [
    {
      title: "All Types",
      value: "",
      disabled: false
    },
    {
      title: "Channel",
      value: "channel",
      disabled: false
    },
    {
      title: "Playlist",
      value: "playlist",
      disabled: false
    },
    {
      title: "Video",
      value: "video",
      disabled: false
    }
  ];
};

export const DATE_FILTERS_OPTIONS = () => {
  return [
    {
      title: "All Dates",
      value: "",
      disabled: false
    },
    {
      title: "Today",
      value: (() => {
        const currentDate = new Date();

        return new Date(
          currentDate.setDate(currentDate.getDate() - 1)
        ).toISOString();
      })(),
      disabled: false
    },
    {
      title: "This Week",
      value: (() => {
        const currentDate = new Date();

        return new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        ).toISOString();
      })(),
      disabled: false
    },
    {
      title: "This Month",
      value: (() => {
        const currentDate = new Date();

        return new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).toISOString();
      })(),
      disabled: false
    }
  ];
};

export const SORT_BY_FILTERS_OPTIONS = () => {
  return [
    {
      title: "All Sorts",
      value: "",
      disabled: false
    },
    {
      title: "Relevance",
      value: "relevance",
      disabled: false
    },
    {
      title: "Upload Date",
      value: "uploadDate",
      disabled: false
    },
    {
      title: "View Count",
      value: "viewCount",
      disabled: false
    },
    {
      title: "Rating",
      value: "rating",
      disabled: false
    }
  ];
};
