import PresetPlayer, { Plugin, Events } from 'xgplayer'
import { IPluginOptions } from 'xgplayer/es/plugin/plugin';

// payTipPlugin.js
export default class payTip extends Plugin {
  private readonly arriveTime: (() => void) | undefined;
  private readonly clickButton: (() => void) | undefined;
  private readonly lookTime: number;
  private readonly tip: string;

  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'payTip'
  }

  static get defaultConfig() {
    return {
      lookTime: 60,
      tip: '此为付费视频, 支持后继续观看?'
    }
  }

  constructor(args: IPluginOptions | undefined) {
    super(args)
    this.lookTime = args?.config.lookTime
    this.tip = args?.config.tip
    this.arriveTime = args?.config.arriveTime
    this.clickButton = args?.config.clickButton
  }

  beforePlayerInit () {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit () {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  afterCreate () {
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.el-button', 'click', this.clickButton)

    this.on(Events.TIME_UPDATE,  (player: PresetPlayer) => {
      if (+player.currentTime >= +this.lookTime) {
        if (this.arriveTime && typeof this.arriveTime) {
          this.arriveTime()
        }
      }
    });
    (this.find('.tip-text') as HTMLSpanElement).innerHTML = this.tip
  }

  destroy () {
    this.unbind('.el-button', 'click', this.clickButton)
  }

  render () {
    return `<div id="pay-tip-plugin" class="pay-tip-plugin">
              <span class="tip-text"></span>
              <button type="button" class="el-button el-button--primary el-button--small">支 付</button>
           </div>`
  }
}
