function ExpandableTextfield(node, tf, def_width, cb)
{
	var handler = function(e)
	{
		var s = '' + tf.val();
		
		tf.css('width', '' + ((Math.max(def_width, s.length) * 7) + 2) + 'px');
		node.geometry_updated();
	};
	
	tf.change(handler);
	tf.keyup(handler);
}
