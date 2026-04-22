/**
 * Poster Plugin V2 - 新一代海报制作插件
 *
 * 基于 FKbuilder 思想，支持：
 * - Layer（图层/轨道）
 * - Component（可复用组件）
 * - BaseElement（元素基类）
 */

const { PosterBuilder } = require('./core/PosterBuilder')
const { Layer } = require('./core/Layer')
const { Component } = require('./core/Component')
const { BaseElement } = require('./core/BaseElement')
const { RectElement, CircleElement, TextElement, ImageElement, DividerElement } = require('./elements')
const { Button, Badge, Card, CTA, Chip, Avatar, Divider, Progress, Rating, Quote, Timeline, Star, Feature, FeatureGrid, StatCard, ListItem, ProgressCircle, Notification, ImageFrame, Arrow, Bubble, Ribbon, Seal, Watermark, Icon, TagCloud, Stepper, Table, HighlightText, Grid, Columns, Barcode, QRCode, Frame, Chart } = require('./components')

module.exports = {
  // 核心类
  PosterBuilder,
  Layer,
  Component,
  BaseElement,

  // 基础元素
  RectElement,
  CircleElement,
  TextElement,
  ImageElement,
  DividerElement,

  // 高级组件
  Button,
  Badge,
  Card,
  CTA,
  Chip,
  Avatar,
  Divider,
  Progress,
  Rating,
  Quote,
  Timeline,
  Star,
  Feature,
  FeatureGrid,
  StatCard,
  ListItem,
  ProgressCircle,
  Notification,
  ImageFrame,
  Arrow,
  Bubble,
  Ribbon,
  Seal,
  Watermark,
  Icon,
  TagCloud,
  Stepper,
  Table,
  HighlightText,
  Grid,
  Columns,
  Barcode,
  QRCode,
  Frame,
  Chart,
}