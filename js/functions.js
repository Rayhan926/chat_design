import $ from "jquery";

export const set_hash = (e) => {
  window.location.hash = e;
};

export const get_hash = (e) => {
  let hashIs = window.location.hash;
  if (e) {
    if (hashIs === "#" + e) return true;
    else return false;
  } else {
    return hashIs;
  }
};

export const search_bar_hash = () => {
  get_hash("search") ? null : hide_seacrh_input();
};

export const dropdown_autoset = (e, downClass, upClass) => {
  let upperClass = upClass ? upClass : "";
  let current_target = $(e.currentTarget);
  let dropdown_menu = current_target.find("[data-dropdown-ul]");
  let dorpdown_wrap_offsetTop = current_target.parent().offset().top;
  let this_height = current_target.height();
  var spaceUp =
    dorpdown_wrap_offsetTop -
    this_height -
    dropdown_menu.height() -
    $(document).scrollTop();

  var spaceDown =
    $(document).scrollTop() +
    document.documentElement.clientHeight -
    (dorpdown_wrap_offsetTop + dropdown_menu.height());

  if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown)) {
    current_target.removeClass(downClass);
    current_target.addClass(upperClass);
  } else {
    current_target.removeClass(upperClass);
    current_target.addClass(downClass);
  }
};

export const outside_close = (click_on, close_to, close_class, e) => {
  var trigger = $(click_on);
  if (trigger !== e.target && trigger.has(e.target).length === 0) {
    $(close_to).removeClass(close_class);
  }
};

export const set_ripple = (e) => {
  let pos = $(e.currentTarget).css("position");
  let fPos = pos == "absolute" ? "absolute" : "relative";
  let oFlow = "hidden";
  $(e.currentTarget).css({
    overflow: oFlow,
    position: fPos,
  });
  let cstmBg = $(e.currentTarget).data("ripple-bg");
  if (cstmBg) {
    cstmBg = $(e.currentTarget).data("ripple-bg");
  } else {
    cstmBg = "rgba(255, 255, 255, 0.1)";
  }
  let x = e.pageX - $(e.currentTarget).offset().left + "px";
  let y = e.pageY - $(e.currentTarget).offset().top + "px";
  let width = $(e.currentTarget).width() * 4 + "px";
  let randClass = "ripple_" + Math.floor(Math.random() * 9999999);
  let rippleSpan = `<span class="ripple_span ${randClass}" style="left: ${x}; top: ${y}; background:${cstmBg}"></span>`;
  let timeIs = 500;
  $(e.currentTarget).append(rippleSpan);
  $(".ripple_span").animate(
    {
      width: width,
      height: width,
    },
    timeIs,
    function () {
      setTimeout(() => {
        $("." + randClass).fadeOut(100);
        setTimeout(() => {
          $("." + randClass).remove();
        }, 100);
      }, 20);
    }
  );
};

export const set_Active_Tab_Bottom_Bar_Posotion = (transitionPer) => {
  let thisTabFromLeft = document
    .querySelector(".swiper-pagination-bullet-active")
    .getBoundingClientRect();
  let paginationWrapFromLeft = document
    .querySelector(".swiper-pagination")
    .getBoundingClientRect();

  let result = thisTabFromLeft.left - paginationWrapFromLeft.left + "px";

  let isTransition = transitionPer ? "0s" : "all 0.3s ease";

  $(".active_tab_bottom_bar").css({
    left: result,
    width: thisTabFromLeft.width + "px",
    transition: isTransition,
  });
};

export const tab_1_hash = () => {
  get_hash("chats") ? $("#tab_no_0").trigger("click") : null;
};
export const tab_2_hash = () => {
  get_hash("requests") ? $("#tab_no_1").trigger("click") : null;
};
export const tab_3_hash = () => {
  get_hash("sendRequests") ? $("#tab_no_2").trigger("click") : null;
};

export const show_seacrh_input = () => {
  set_hash("search");
  $(".header_search_wrap").addClass("show");
  $(".header_search_wrap input").trigger("focus");
  $(".swiper-pagination").addClass("hide");
  $(".search_friends_wrap").slideUp(200);
};

export const hide_seacrh_input = () => {
  $(".header_search_wrap").removeClass("show");
  $(".header_search_wrap input").val("");
  $(".swiper-pagination").removeClass("hide");
  $(".search_friends_wrap").slideDown(200);
};

export const change_placeholder = (val) => {
  $(".header_search_wrap input").attr("placeholder", val);
};

let currentLeft, currentTop, currentWidth, currentHeight, prevImgElm;
export const profile_image_view_mode = (e) => {
  prevImgElm = e;

  let thisElm = e.currentTarget;
  if (!$(thisElm).hasClass("view_photo_mode")) {
    let container = document
      .querySelector(".chat_wrapper")
      .getBoundingClientRect();
    let thisElmRect = thisElm.getBoundingClientRect();
    currentLeft = thisElmRect.left - container.left + "px";
    currentTop = thisElmRect.top - container.top + "px";
    currentWidth = thisElmRect.width + "px";
    currentHeight = thisElmRect.height + "px";
    let imgSrc = $(thisElm).find("img").attr("src");

    let compo = `<section class="profile_img_view_mode_section">
                  <div class="img_container" style="left: ${currentLeft}; top: ${currentTop}; width: ${currentWidth}; height: ${currentHeight} ">
                    <img src="${imgSrc}" alt="Image" />
                  </div>
                </section>`;

    $(".chat_wrapper").append(compo);

    let widthBig = (container.width / 100) * 55;
    let topPos = container.height / 2 - widthBig / 2 + "px";
    let leftPos = container.width / 2 - widthBig / 2 + "px";

    setTimeout(() => {
      $(".profile_img_view_mode_section .img_container").css({
        width: widthBig + "px",
        height: widthBig + "px",
        borderRadius: "0px",
        left: leftPos,
        top: topPos,
        opacity: "1",
        pointerEvents: "all",
      });
    }, 20);
  }

  set_hash("viewProfileImg");
};

export const view_profile_img_hash = () => {
  get_hash("viewProfileImg") ? null : force_hide_profile_image_view_mode();
};

export const hide_profile_image_view_mode = (e) => {
  if ($(e.target).hasClass("profile_img_view_mode_section")) {
    $(".profile_img_view_mode_section .img_container").css({
      width: currentWidth,
      height: currentHeight,
      borderRadius: "50%",
      left: currentLeft,
      top: currentTop,
      // opacity: "0",
    });
  }
  setTimeout(() => {
    $(".profile_img_view_mode_section").animate(
      {
        opacity: "0",
      },
      200,
      () => {
        $(".profile_img_view_mode_section").remove();
      }
    );
  }, 200);
};

export const force_hide_profile_image_view_mode = () => {
  $(".profile_img_view_mode_section .img_container").css({
    width: currentWidth,
    height: currentHeight,
    borderRadius: "50%",
    left: currentLeft,
    top: currentTop,
  });

  setTimeout(() => {
    $(".profile_img_view_mode_section").animate(
      {
        opacity: "0",
      },
      200,
      () => {
        $(".profile_img_view_mode_section").remove();
      }
    );
  }, 200);
};
// let prevFullScreenImgSrcElm;
export const profile_image_view_in_full_screen_mode = (e) => {
  // prevFullScreenImgSrcElm = e;
  let imgSrc = $(e.currentTarget).find("img").attr("src");
  let compo = `<div class="bg_black_full">
  <div class="bg_black_btn_wrap">
    <button data-ripple>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>
  </div>
  <img src="${imgSrc}" alt="Me" />
</div>`;
  $(".chat_wrapper").append(compo);

  set_hash("ImgInFullScreen");
};

export const img_in_fullscreen_hash = () => {
  get_hash("ImgInFullScreen")
    ? null
    : hide_profile_image_view_in_full_screen_mode();
};

export const hide_profile_image_view_in_full_screen_mode = () => {
  $(".bg_black_full").animate(
    {
      left: "100%",
    },
    200,
    () => {
      $(".bg_black_full img").attr("src", "");
      $(".bg_black_full").remove();
    }
  );
};

export const toggle_login_signup_section = (e) => {
  e.preventDefault();
  $(".login_wrap").slideToggle(300);
  $(".signup_wrap").slideToggle(300);
};

export const change_placeholder_all = () => {
  let activeTabBullet = $(".swiper-pagination-bullet-active").attr("id");
  activeTabBullet == "tab_no_0" ? change_placeholder("Search..") : null;
  activeTabBullet == "tab_no_1" ? change_placeholder("Search request") : null;
  activeTabBullet == "tab_no_2"
    ? change_placeholder("Find friends by username")
    : null;
};
let isAlreadyAppended = false;
export const open_chating_section = () => {
  if (!isAlreadyAppended) {
    set_hash("chating");
    let compo = `<div class="chating_wrap">
  <header class="chating_header_wrap">
    <div class="back_button_box">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </div>
    <div class="chat_personn_name_box">
      <div class="img_box">
        <img src="./img/me.png" alt="Me" />
      </div>
      <div class="name_box">
        <h4 class="line_clamp_1">
          Rayhan Ahmed Rayhan Ahmed Rayhan Ahmed
        </h4>
        <p>Last seen: 10:12pm</p>
      </div>
    </div>
    <div class="chat_personn_option_box">
      <div class="dropdown_component_wrap">
        <div class="dropdown_dot_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </div>
        <ul class="dropdown_ul" data-dropdown-ul>
          <li>
            <a href="#" data-ripple data-ripple-bg="rgba(0, 42, 70, 0.1)">
              <p class="dropdown_text_box">Profile</p>
            </a>
          </li>
          <li>
            <a href="#" data-ripple data-ripple-bg="rgba(0, 42, 70, 0.1)">
              <p class="dropdown_text_box">Home</p>
            </a>
          </li>
          <li>
            <a href="#" data-ripple data-ripple-bg="rgba(0, 42, 70, 0.1)">
              <p class="dropdown_text_box">Home</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div class="chating_body_wrap">
    <div class="all_chats_show_wrap thin_scrollbar">
      <div class="chat_wrap">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box">
            <!-- <img src="./img/me.png" alt="Me" /> -->
          </div>
          <p class="chat_text_p">
            Lorem ipsum dolor, sit amet consectetur
          </p>
        </div>
      </div>
      <div class="chat_wrap">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box">
            <img src="./img/me.png" alt="Me" />
          </div>
          <p class="chat_text_p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Animi dolorem labore et at facere saepe, fuga beatae omnis,
            esse dolor, veniam nemo excepturi laborum. Exercitationem!
          </p>
        </div>
      </div>
      <div class="chat_wrap from_other_side">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box">
            <img src="./img/me.png" alt="Me" />
          </div>
          <p class="chat_text_p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Animi dolorem labore et at facere saepe, fuga beatae omnis,
            esse dolor, veniam nemo excepturi laborum. Exercitationem!
          </p>
          <div class="chat_sent_time_and_seen_unseen_box">
            <span class="chat_sent_time">11.15 AM</span>
            <span class="chat_seen_unseen status_unseen">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="unseen_check"
              >
                <path
                  d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 594.149 594.149"
                class="seen_check"
              >
                <g>
                  <g>
                    <path
                      d="M448.8,161.925l-35.7-35.7l-160.65,160.65l35.7,35.7L448.8,161.925z M555.899,126.225l-267.75,270.3l-107.1-107.1
l-35.7,35.7l142.8,142.8l306-306L555.899,126.225z M0,325.125l142.8,142.8l35.7-35.7l-142.8-142.8L0,325.125z"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="chat_wrap">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box"></div>
          <p class="chat_text_p">Lorem ipsum dolor</p>
        </div>
      </div>
      <div class="chat_wrap">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box"></div>
          <p class="chat_text_p">
            Lorem ipsum dolor, sit amet consectetur
          </p>
        </div>
      </div>
      <div class="chat_wrap from_other_side">
      <div class="forward_activate_icon_box">
          <svg
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.772 10.462-8.5-8.25c-.216-.21-.539-.269-.814-.153-.277.118-.458.39-.458.691v4.252c-7.743.134-14 6.474-14 14.248 0 .342.241.622.572.708.059.015.118.022.177.022.274 0 .541-.157.678-.404 2.245-4.056 6.519-6.576 11.155-6.576h1.418v4.25c0 .301.181.573.458.691.274.116.599.057.814-.153l8.5-8.25c.146-.141.228-.335.228-.538s-.082-.397-.228-.538z"
            />
          </svg>
        </div>
        <div class="chat_text_or_image_wrap">
          <div class="chating_image_box"></div>
          <p class="chat_text_p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Deleniti eaque beatae doloremque repellat impedit ipsum sit,
            quas et aliquid, consequatur illum, iure modi a assumenda
            iste. Voluptas eos aut quo
          </p>
          <div class="chat_sent_time_and_seen_unseen_box">
            <span class="chat_sent_time">11.15 AM</span>
            <span class="chat_seen_unseen status_seen">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="unseen_check"
              >
                <path
                  d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 594.149 594.149"
                class="seen_check"
              >
                <g>
                  <g>
                    <path
                      d="M448.8,161.925l-35.7-35.7l-160.65,160.65l35.7,35.7L448.8,161.925z M555.899,126.225l-267.75,270.3l-107.1-107.1
l-35.7,35.7l142.8,142.8l306-306L555.899,126.225z M0,325.125l142.8,142.8l35.7-35.7l-142.8-142.8L0,325.125z"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="chats_send_from_wrap">
      <form action="#">
        <div class="chat_from_inner">
          <div class="chat_input_box">
            <div class="chat_input_box_corner">
              <div class="top_shadow"></div>
              <div class="bottom_right_shadow"></div>
            </div>
            <div class="chat_emoji_box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
            <input type="text" placeholder="Type a message" />
            <div class="chat_send_img_box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
          </div>
          <div class="chat_submit_box">
            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>`;
    $(".chat_wrapper").append(compo);
    isAlreadyAppended = true;
  }
};
export const close_chating_section = () => {
  if (isAlreadyAppended) {
    $(".chating_wrap").animate(
      {
        left: "100%",
      },
      200,
      () => {
        $(".chating_wrap").remove();
      }
    );
    off_chat_select_mode();
    isAlreadyAppended = false;
  }
};
export const chating_hash = () => {
  // if (get_hash("chating")) {
  //   open_chating_section();
  // } else if (!get_hash("ImgInFullScreen") && !get_hash("chating")) {
  //   close_chating_section();
  // }

  if (!get_hash("ImgInFullScreen") && !get_hash("chating")) {
    close_chating_section();
  }
};
export const chat_selected_hash = () => {
  get_hash("chatSelected") ? null : off_chat_select_mode();
};

export let clickElm = ".single_chat_wrap";
export var chat_select_mode_on = false;
let selectedCount = 0,
  firstSelect = false;
export let isSelectionStart = false;

export const select_more_then_one_chat = (e) => {
  if (isSelectionStart) {
    let thisElm = e.currentTarget;
    if (chat_select_mode_on) {
      if (!$(thisElm).hasClass("selected_chat")) {
        $(thisElm).addClass("selected_chat");
        selectedCount++;
      } else {
        if (!firstSelect) {
          $(thisElm).removeClass("selected_chat");
          selectedCount--;
        }
      }
    }
    firstSelect = false;
    if (selectedCount <= 0) off_chat_select_mode();
  }
};

export const on_chat_select_mode = (e) => {
  if (!isSelectionStart) {
    set_hash("chatSelected");
    chat_select_mode_on = true;
    $(".chat_wrapper").addClass("chat_selected_mode_on");
    $(e.currentTarget).addClass("selected_chat");
    firstSelect = true;
    selectedCount++;
    isSelectionStart = true;
    return false;
  }
};

export const off_chat_select_mode = () => {
  chat_select_mode_on = false;
  $(".chat_wrapper").removeClass("chat_selected_mode_on");
  $(clickElm).removeClass("selected_chat");
  firstSelect = false;
  isSelectionStart = false;
  selectedCount = 0;
};

export const c = (e) => {
  console.log(e);
};
export const a = (e) => {
  alert(e);
};
