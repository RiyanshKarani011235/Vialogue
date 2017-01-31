// var JSON2 = require('JSON2');
// var validateJson = require('./validateJson.js');
// var should = require('chai').should();
//
// describe('validateJson.spec.js', function() {
//
// 	describe('jsonObject', function() {
//
// 		describe('hasField', function() {
//
// 			it('should return true for {"id": 10}', function() {
// 				new validateJson.jsonObject('{"id": 10}').hasField('id').should.equal(true);
// 			});
//
// 			it('should return false for {}', function() {
// 				new validateJson.jsonObject('{}').hasField('id').should.equal(false);
// 			});
//
// 		});
// 	});
//
// 	describe('projectJsonObject', function() {
//
// 		describe('validateId', function() {
//
// 			it('should work for {"id" : 10}', function() {
// 				new validateJson.projectJsonObject('{"id": 10}').validateId('id').should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateId('id').should.equal(false);
// 			});
//
// 			it.skip('should not work if id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateProjectId', function() {
//
// 			it('should work for {"id": 10}', function() {
// 				new validateJson.projectJsonObject('{"id" : 10}').validateProjectId().should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateProjectId().should.equal(false);
// 			});
//
// 			it('should not work for {"parent_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"parent_id": 10}').validateProjectId().should.equal(false);
// 			});
//
// 			it.skip('should not work if id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateParentProjectId', function() {
//
// 			it('should work for {"parent_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"parent_id" : 10}').validateParentProjectId().should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateParentProjectId().should.equal(false);
// 			});
//
// 			it('should not work for {"id": 10}', function() {
// 				new validateJson.projectJsonObject('{"id": 10}').validateParentProjectId().should.equal(false);
// 			});
//
// 			it.skip('should not work if parent_id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateOriginalParentProjectId', function() {
//
// 			it('should work for {"original_parent_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"original_parent_id" : 10}').validateOriginalParentProjectId().should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateOriginalParentProjectId().should.equal(false);
// 			});
//
// 			it('should not work for {"id": 10}', function() {
// 				new validateJson.projectJsonObject('{"id": 10}').validateOriginalParentProjectId().should.equal(false);
// 			});
//
// 			it.skip('should not work if original_parent_id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateProjectName', function() {
//
// 			it('should work for {"name": 10}', function() {
// 				new validateJson.projectJsonObject('{"name": 10}').validateProjectName().should.equal(true);
// 			});
//
// 			it('should not work for {"name": null}', function() {
// 				new validateJson.projectJsonObject('{"name": null}').validateProjectName().should.equal(false);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateProjectName().should.equal(false);
// 			});
//
// 			it.skip('should not work if projectName is not valid', function() {
//
// 			});
//
//
// 		});
//
// 		describe('validateIsDubbed', function() {
//
// 			it('should work for {"is_dubbed": true}', function() {
// 				new validateJson.projectJsonObject('{"is_dubbed": true}').validateIsDubbed().should.equal(true);
// 			});
//
// 			it('should work for {"is_dubbed": false}', function() {
// 				new validateJson.projectJsonObject('{"is_dubbed": false}').validateIsDubbed().should.equal(true);
// 			});
//
// 			it('should not work for {"is_dubbed": 10}', function() {
// 				new validateJson.projectJsonObject('{"is_dubbed": 10}').validateIsDubbed().should.equal(false);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateIsDubbed().should.equal(false);
// 			});
//
// 		});
//
// 		describe('validateCategoryId', function() {
//
// 			it('should work for {"category_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"category_id": 10}').validateCategoryId().should.equal(true);
// 			});
//
// 			it('should not work for {"category_id": null}', function() {
// 				new validateJson.projectJsonObject('{"category_id": null}').validateCategoryId().should.equal(false);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateCategoryId().should.equal(false);
// 			});
//
// 			it.skip('should not work if category_id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateLanguageId', function() {
//
// 			it('should work for {"language_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"language_id": 10}').validateLanguageId().should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateLanguageId().should.equal(false);
// 			});
//
// 			it('should not work for {"language_id": null}', function() {
// 				new validateJson.projectJsonObject('{"language_id": null}').validateLanguageId().should.equal(false);
// 			});
//
// 			it.skip('should not work if language_id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateAuthorId', function() {
//
// 			it('should work for {"author_id": 10}', function() {
// 				new validateJson.projectJsonObject('{"author_id": 10}').validateAuthorId().should.equal(true);
// 			});
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateAuthorId().should.equal(false);
// 			});
//
// 			it('should not work for {"author_id": null}', function() {
// 				new validateJson.projectJsonObject('{"author_id": null}').validateAuthorId().should.equal(false);
// 			});
//
// 			it.skip('should not work if user_id does not exist in database', function() {
//
// 			});
//
// 		});
//
// 		describe('validateResolution', function() {
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateResolution().should.equal(false);
// 			});
//
// 			it('should not work for {"resolution_x": 10}', function() {
// 				new validateJson.projectJsonObject('{"resolution_x": 10}').validateResolution().should.equal(false);
// 			});
//
// 			it('should not work for {"resolution_y": 10}', function() {
// 				new validateJson.projectJsonObject('{"resolution_y": 10}').validateResolution().should.equal(false);
// 			});
//
// 			it('should not work for {"resolution_x": 10, "resolution_y": 10}', function() {
// 				new validateJson.projectJsonObject('{"resolution_x": 10, "resolution_y": 10}').validateResolution().should.equal(true);
// 			});
//
// 			it('should work only for integer resolution values', function() {
// 				new validateJson.projectJsonObject('{"resolution_x": true, "resolution_y": 10}').validateResolution().should.equal(false);
// 				new validateJson.projectJsonObject('{"resolution_x": 10, "resolution_y": false}').validateResolution().should.equal(false);
// 				new validateJson.projectJsonObject('{"resolution_x": 10, "resolution_y": 1.234}').validateResolution().should.equal(false);
// 				new validateJson.projectJsonObject('{"resolution_x": 10.111, "resolution_y": 1}').validateResolution().should.equal(false);
// 				new validateJson.projectJsonObject('{"resolution_x": 10, "resolution_y": "hello wrodl"}').validateResolution().should.equal(false);
// 			});
//
// 		});
//
// 		describe('validateSlides', function() {
//
// 			var json = {
// 				"slides": {
// 					"1" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"2" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"3" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					}
//
// 				}
// 			}
//
// 			it('should work', function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json)).validateSlides().should.equal(true);
// 			});
//
// 			it('should not work', function() {
// 				new validateJson.projectJsonObject('{"slides": {}}').validateSlides().should.equal(false);
// 			});
//
// 			var json2 = {
// 				"slides": {
// 					"1" : {
// 						"layering_objects": null,
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 				}
// 			};
//
// 			it('should not work', function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json2)).validateSlides().should.equal(false);
// 			});
//
// 		});
//
// 		describe('validateSlideIds', function() {
//
// 			var json = {
// 				"slides": {
// 					"1": {"a":10},
// 					"2": {},
// 					"3": {},
// 					"0": {}
// 				}
// 			}
// 			it('should return true for ' + JSON2.stringify(json), function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json)).validateSlideIds().should.equal(true);
// 			});
//
// 			var json2 = {
// 				"slides": {
// 					"1": {},
// 					"2": {},
// 					"1.222": {},
// 					"0": {}
// 				}
// 			}
// 			it('should return false for ' + JSON2.stringify(json2), function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json2)).validateSlideIds().should.equal(false);
// 			});
//
// 			var json3 = {
// 				"slides": {
// 					"1": {},
// 					"2": {},
// 					"h": {},
// 					"0": {}
// 				}
// 			}
// 			it('should return false for ' + JSON2.stringify(json3), function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json3)).validateSlideIds().should.equal(false);
// 			});
//
// 			var json4 = {
// 				"slides": {
// 					"1": {},
// 					"2": {},
// 					"": {},
// 					"0": {}
// 				}
// 			}
// 			it('should return false for ' + JSON2.stringify(json4), function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json4)).validateSlideIds().should.equal(false);
// 			});
//
// 			var json5 = {
// 				"slides": {
// 					"1": {},
// 					"2": {},
// 					"-1": {},
// 					"0": {}
// 				}
// 			}
// 			it('should return false for ' + JSON2.stringify(json5), function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json5)).validateSlideIds().should.equal(false);
// 			});
//
// 		});
//
// 		describe('validateSlide', function() {
//
// 			var json = {
// 				"layering_objects": [],
// 				"hyperlink": null,
// 				"type": "image",
// 				"urls": {
// 					"audio_url": null,
// 					"image_url": null,
// 					"video_url": null,
// 					"question_url": null
// 				}
// 			}
//
// 			it('should work', function() {
// 				new validateJson.projectJsonObject('{}').validateSlide(json).should.equal(true);
// 			});
//
// 			it.skip('should check question JSON format', function() {
//
// 			});
//
// 		});
//
// 		describe('validateSlideLayeringObjects', function() {
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideLayeringObjects({}).should.equal(false);
// 			});
//
// 			it('should not work for {"layering_objects": null}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideLayeringObjects({"layering_objects": null}).should.equal(false);
// 			});
//
// 			it('should not work for {"layering_objects": 10}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideLayeringObjects({"layering_objects": 10}).should.equal(false);
// 			});
//
// 			it('should work for {"layering_objects": []}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideLayeringObjects({"layering_objects": []}).should.equal(true);
// 			});
//
// 			it.skip('should not work if layering_object is not a valid object', function() {
//
// 			});
//
// 		});
//
// 		describe('validateSlideHyperlink', function() {
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideHyperlink({}).should.equal(false);
// 			});
//
// 			it('should not work for {"hyperlink": null}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideHyperlink({"hyperlink": null}).should.equal(false);
// 			});
//
// 			it.skip('should not work if the hyperlink value is not a valid slide id', function() {
//
// 			});
//
// 		});
//
// 		describe('validateSlideType', function() {
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({}).should.equal(false);
// 			});
//
// 			it('should not work for {"type": null}', function() {
// 				new validateJson.projectJsonObject('{"type": null}').validateSlideType({}).should.equal(false);
// 			});
//
// 			it('should not work for {"type": 10}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({"type": 10}).should.equal(false);
// 			});
//
// 			it('should not work for {"type": "hello"}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({"type": "hello"}).should.equal(false);
// 			});
//
// 			it('should work for {"type": "video"}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({"type": "video"}).should.equal(true);
// 			});
//
// 			it('should work for {"type": "image"}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({"type": "image"}).should.equal(true);
// 			});
//
// 			it('should work for {"type": "question"}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideType({"type": "question"}).should.equal(true);
// 			});
//
// 		});
//
// 		describe('validateSlideUrls', function() {
//
// 			it('should not work for {}', function() {
// 				new validateJson.projectJsonObject('{}').validateSlideUrls({}).should.equal(false);
// 			});
//
// 			it('should not work for {"urls": null}', function() {
// 				new validateJson.projectJsonObject('{"urls": null}').validateSlideUrls({}).should.equal(false);
// 			});
//
// 			var json = {
// 				"urls": {
// 					"audio_url": 10,
// 					"video_url": 10,
// 					"image_url": 10,
// 					"question_url": 10
// 				}
// 			}
//
// 			it('should work for ' + JSON2.stringify(json), function() {
// 				new validateJson.projectJsonObject('{}').validateSlideUrls(json).should.equal(true);
// 			});
//
// 			it.skip('should not work if urls aren\'t valid', function() {
//
// 			});
//
// 		});
//
// 		describe('validateSlideOrderingSequence', function() {
//
// 			var json = {
// 				"slide_ordering_sequence": ["2", "1", "3"],
// 				"slides": {
// 					"1" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"2" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"3" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					}
//
// 				}
// 			}
//
// 			it('should work', function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json)).validateSlideOrderingSequence().should.equal(true);
// 			});
//
// 			var json2 = {
// 				"slide_ordering_sequence": ["2", "3"],
// 				"slides": {
// 					"1" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"2" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"3" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					}
//
// 				}
// 			}
//
// 			it('should not work', function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json2)).validateSlideOrderingSequence().should.equal(false);
// 			});
//
// 			var json3 = {
// 				"slide_ordering_sequence": null,
// 				"slides": {
// 					"1" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"2" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					},
// 					"3" : {
// 						"layering_objects": [],
// 						"hyperlink": null,
// 						"type": "image",
// 						"urls": {
// 							"audio_url": null,
// 							"image_url": null,
// 							"video_url": null,
// 							"question_url": null
// 						}
// 					}
//
// 				}
// 			}
//
// 			it('should not work', function() {
// 				new validateJson.projectJsonObject(JSON2.stringify(json3)).validateSlideOrderingSequence().should.equal(false);
// 			});
//
// 		});
//
// 	});
// });
