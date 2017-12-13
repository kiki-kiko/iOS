//
//  Native.js
//  Music
//
//  Copyright © 2016 Apple Inc. All rights reserved.
//

class Native {
    constructor() {

        // Singletons.
        this.Application = Application;
        this.CapabilitiesController = CapabilitiesController;
        this.Device = Device;
        this.MetricsController = MetricsController;
        this.Network = Network;
        this.PlayActivityController = PlayActivityController;
        this.SocialActivityController = SocialActivityController;
        this.PushNotificationObserver = PushNotificationObserver;
        this.Store = Store;
        this.SubscriptionStatusCoordinator = SubscriptionStatusCoordinator;
        this.Persistence = Persistence;

        // Native requests.
        this.StoreHTTPRequest = StoreHTTPRequest;
        this.StoreContentLookupRequest = StoreContentLookupRequest;
        this.StorePlaybackPositionRequest = StorePlaybackPositionRequest;
        this.SubscriptionStatusRequest = SubscriptionStatusRequest;

        // Scripting requests.
        this.ShareRequest = ShareRequest;
        this.ShareResult = ShareResult;
        this.ConnectFeedItemLikeRequest = ConnectFeedItemLikeRequest;
        this.ConnectFeedItemLikeResult = ConnectFeedItemLikeResult;
        this.ConnectFeedItemCommentRequest = ConnectFeedItemCommentRequest;
        this.ConnectFeedItemCommentResult = ConnectFeedItemCommentResult;

        // Enumerations.
        this.HTTP = HTTP;

        // Segues.
        this.PushSegue = PushSegue;
        this.PresentationSegue = PresentationSegue;
        this.RedeemSegue = RedeemSegue;
        this.NoopSegue = NoopSegue;
        this.StoreFlowSegue = StoreFlowSegue;
        this.DeepLinkSegue = DeepLinkSegue;
        this.RedirectSegue = RedirectSegue;
        
        // Utilities.
        this.Cookie = Cookie;
        this.NativeExecutionFence = NativeExecutionFence;
        this.Timer = Timer;
        this.IdentifierSet = IdentifierSet;
        this.MovieClipItem = MovieClipItem;

        // View models.
        this.AlbumDetail = AlbumDetail;
        this.AlertViewModel = AlertViewModel;
        this.AlertAction = AlertAction;
        this.Brick = Brick;
        this.BrickItem = BrickItem;
        this.ConnectFeed = ConnectFeed;
        this.ConnectFeedItem = ConnectFeedItem;
        this.ConnectFeedItemLink = ConnectFeedItemLink;
        this.ConnectFeedItemDetail = ConnectFeedItemDetail;
        this.ConnectFeedContentItem = ConnectFeedContentItem;
        this.ConnectFollowViewModel = ConnectFollowViewModel;
        this.ConnectCommentItem = ConnectCommentItem;
        this.ConnectUser = ConnectUser;
        this.ContextAction = ContextAction;
        this.Flowcase = Flowcase;
        this.FlowcaseItem = FlowcaseItem;
        this.Grid = Grid;
        this.GridSection = GridSection;
        this.GridItem = GridItem;
        this.GridItemButton = GridItemButton;
        this.Menu = Menu;
        this.MenuSection = MenuSection;
        this.MenuItem = MenuItem;
        this.MessageViewModel = MessageViewModel;
        this.MusicVideoViewModel = MusicVideoViewModel;
        this.MusicVideoItem = MusicVideoItem;
        this.OnboardingViewModel = OnboardingViewModel;
        this.OrderedPlaylistSelector = OrderedPlaylistSelector;
        this.OrderedPlaylistSelectorItem = OrderedPlaylistSelectorItem;
        this.ParagraphViewModel = ParagraphViewModel;
        this.ToggleSelectorViewModel = ToggleSelectorViewModel;
        this.ToggleSelectorItem = ToggleSelectorItem;
        this.MultiChoiceViewModel = MultiChoiceViewModel;
        this.MultiChoiceItem = MultiChoiceItem;
        this.ItemizedTextListViewModel = ItemizedTextListViewModel;
        this.ItemizedTextListItem = ItemizedTextListItem;
        this.GroupedTextListViewModel = GroupedTextListViewModel;
        this.GroupedTextListItem = GroupedTextListItem;
        this.BadgingViewModel = BadgingViewModel;
        this.BadgingItem = BadgingItem;
        this.PersonalMixesViewModel = PersonalMixesViewModel;
        this.PersonalMixItem = PersonalMixItem;
        this.PlaylistDetail = PlaylistDetail;
        this.SearchResults = SearchResults;
        this.SearchResultSection = SearchResultSection;
        this.SearchResultItem = SearchResultItem;
        this.SearchRecentsSection = SearchRecentsSection;
        this.SearchTrendingSection = SearchTrendingSection;
        this.SearchTrendingItem = SearchTrendingItem;
        this.SettingsViewModel = SettingsViewModel;
        this.SettingsAuthenticationSection = SettingsAuthenticationSection;
        this.SettingsLink = SettingsLink;
        this.SettingsSection = SettingsSection;
        this.SettingsItem = SettingsItem;
        this.Shelf = Shelf;
        this.ShelfSection = ShelfSection;
        this.ShelfItem = ShelfItem;
        this.StaticImageViewModel = StaticImageViewModel;
        this.VerticalStack = VerticalStack;
        this.SocialOnboardingFriendsFinder = SocialOnboardingFriendsFinder;
        this.SocialOnboardingNetwork = SocialOnboardingNetwork;
        this.SocialOnboardingVerticalStack = SocialOnboardingVerticalStack;
        this.SocialProfile = SocialProfile;
        this.SocialProfileCollection = SocialProfileCollection;
        this.SocialProfileCollectionItem = SocialProfileCollectionItem;
        this.SocialProfileVerticalStack = SocialProfileVerticalStack;
        this.SocialProfileEditor = SocialProfileEditor;
        
        // Component controllers.
        this.UpsellBanner = UpsellBanner
        this.HeaderItem = HeaderItem
        this.BarButtonItem = BarButtonItem
        this.ComponentController = ComponentController;
        this.AlbumDetailComponentController = AlbumDetailComponentController;
        this.PlaylistDetailComponentController = PlaylistDetailComponentController;
        this.SearchResultsComponentController = SearchResultsComponentController;
        this.SearchWelcomeComponentController = SearchWelcomeComponentController;
        this.LibraryCollectionComponentController = LibraryCollectionComponentController;
        this.AlertComponentController = AlertComponentController;
    }
}

var native = new Native();
