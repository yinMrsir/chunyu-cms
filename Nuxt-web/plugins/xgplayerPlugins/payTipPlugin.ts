import { Plugin, Events } from 'xgplayer'
import { IPluginOptions } from 'xgplayer/es/plugin/plugin';

// payTipPlugin.js
export default class payTipPlugin extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  private icon: HTMLElement | null | undefined;
  private onIconClick: ((e: any) => void) | undefined;
  private arriveTime: ((e: any) => void) | undefined;
  private clickButton: ((e: any) => void) | undefined;
  private lookTime: number;

  static get pluginName() {
    return 'payTipPlugin'
  }

  static get defaultConfig() {
    return {}
  }

  constructor(args: IPluginOptions | undefined) {
    super(args)
    this.lookTime = args?.config.lookTime
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
    const self = this
    this.icon = this.find('.icon')
    this.onIconClick = () => {
      self.clickButton && self.clickButton(() => {
        (document.querySelector('#pay-tip-plugin') as HTMLDivElement).style.display = 'none'
      })
    }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.el-button', 'click', this.onIconClick)
    //TODO 插件实例化之后的一些逻辑
    this.on(Events.TIME_UPDATE, function (){
      // @ts-ignore
      if (+this.currentTime >= +self.lookTime) {
        if (self.arriveTime && typeof self.arriveTime) {
          self.arriveTime(function () {
            (document.querySelector('#pay-tip-plugin') as HTMLDivElement).style.display = 'flex'
          })
        }
      }
    })
  }

  destroy () {
    this.unbind('.el-button', 'click', this.onIconClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
  }

  render () {
    return `<div id="pay-tip-plugin" class="pay-tip-plugin">此为付费视频，支付10金币继续观看？<button type="button" class="el-button el-button--primary el-button--small">支 付</button></div>`
  }
}